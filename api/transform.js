export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { rawNotes, userProfile } = req.body;

  if (!rawNotes || !userProfile) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const { name, role, company, reportsTo, theirPriorities, updateFormat, priorities, metrics } = userProfile;

  const formatInstructions = {
    'bullets': 'Use concise bullet points. No fluff.',
    'detailed': 'Provide detailed context for each section, but remain structured.',
    'narrative': 'Write in a flowing narrative style, but keep it scannable with clear paragraphs.'
  };

  const systemPrompt = `You are an expert executive communications coach. Your job is to transform raw, messy notes from ${name}, a ${role} at ${company}, into a polished update for their ${reportsTo}.

CONTEXT ABOUT THE RECIPIENT:
- They care most about: ${theirPriorities?.join(', ') || 'business results'}
- Preferred format: ${formatInstructions[updateFormat] || formatInstructions['bullets']}

CONTEXT ABOUT ${name?.toUpperCase() || 'THE USER'}:
- Current priorities: ${priorities?.filter(p => p).join(', ') || 'not specified'}
- Key metrics they own: ${metrics || 'not specified'}

Transform the input into this structure:

**TL;DR** (2-3 sentences max - the headline)

**Wins This Week** (2-4 bullets, outcome-focused, with metrics where possible)

**In Progress** (2-3 bullets on key initiatives, with status and expected completion)

**Needs Attention** (1-2 items that are blocked, at risk, or need input - be specific about what's needed)

**Next Week Focus** (2-3 priorities)

Rules:
- Be concise. Executives skim.
- Lead with impact, not activity ("Pipeline up 30%" not "Published 12 blog posts")
- Frame updates around what the ${reportsTo} cares about: ${theirPriorities?.slice(0, 2).join(' and ') || 'results'}
- If something needs a decision, say exactly what decision and by when
- If there are risks, state them plainly with mitigation
- Remove all fluff, hedge words, and unnecessary context
- Sound confident and in control, not defensive or apologetic

Write in a professional but warm tone. No jargon. No buzzwords.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: `Here are my raw notes for this week. Transform them into an update ready for my ${reportsTo}:\n\n${rawNotes}`,
          },
        ],
      }),
    });

    const data = await response.json();

    if (data.content && data.content[0] && data.content[0].text) {
      return res.status(200).json({ output: data.content[0].text });
    } else if (data.error) {
      return res.status(500).json({ error: data.error.message || 'API error' });
    } else {
      return res.status(500).json({ error: 'Unexpected response from API' });
    }
  } catch (error) {
    console.error('Transform error:', error);
    return res.status(500).json({ error: 'Failed to transform update' });
  }
}
