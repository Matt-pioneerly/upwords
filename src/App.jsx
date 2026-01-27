import { useState } from 'react';

// ============================================
// SYSTEM PROMPT GENERATOR
// ============================================
const generateSystemPrompt = (userProfile) => {
  const { name, role, company, reportsTo, theirPriorities, updateFormat, priorities, metrics } = userProfile;
  
  const formatInstructions = {
    'bullets': 'Use concise bullet points. No fluff.',
    'detailed': 'Provide detailed context for each section, but remain structured.',
    'narrative': 'Write in a flowing narrative style, but keep it scannable with clear paragraphs.'
  };

  return `You are an expert executive communications coach. Your job is to transform raw, messy notes from ${name}, a ${role} at ${company}, into a polished update for their ${reportsTo}.

CONTEXT ABOUT THE RECIPIENT:
- They care most about: ${theirPriorities.join(', ')}
- Preferred format: ${formatInstructions[updateFormat] || formatInstructions['bullets']}

CONTEXT ABOUT ${name.toUpperCase()}:
- Current priorities: ${priorities.filter(p => p).join(', ')}
- Key metrics they own: ${metrics}

Transform the input into this structure:

**TL;DR** (2-3 sentences max - the headline)

**Wins This Week** (2-4 bullets, outcome-focused, with metrics where possible)

**In Progress** (2-3 bullets on key initiatives, with status and expected completion)

**Needs Attention** (1-2 items that are blocked, at risk, or need input - be specific about what's needed)

**Next Week Focus** (2-3 priorities)

Rules:
- Be concise. Executives skim.
- Lead with impact, not activity ("Pipeline up 30%" not "Published 12 blog posts")
- Frame updates around what the ${reportsTo} cares about: ${theirPriorities.slice(0, 2).join(' and ')}
- If something needs a decision, say exactly what decision and by when
- If there are risks, state them plainly with mitigation
- Remove all fluff, hedge words, and unnecessary context
- Sound confident and in control, not defensive or apologetic

Write in a professional but warm tone. No jargon. No buzzwords.`;
};

// ============================================
// STYLES
// ============================================
const styles = {
  // Global
  container: {
    minHeight: '100vh',
    backgroundColor: '#F5F5F3',
    fontFamily: '"Outfit", -apple-system, sans-serif',
    color: '#1a1a1a',
  },
  
  // Auth & Onboarding Layout
  authContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 24px',
  },
  authCard: {
    width: '100%',
    maxWidth: '480px',
    backgroundColor: '#fff',
    border: '1px solid #e5e5e5',
    borderRadius: '4px',
    padding: '48px 40px',
  },
  logo: {
    fontFamily: '"Space Grotesk", sans-serif',
    fontSize: '32px',
    fontWeight: '300',
    letterSpacing: '0.25em',
    textAlign: 'center',
    marginBottom: '8px',
  },
  tagline: {
    fontSize: '12px',
    color: '#888',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: '40px',
  },
  
  // Progress indicator
  progressContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '32px',
  },
  progressDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#ddd',
    transition: 'background-color 0.2s ease',
  },
  progressDotActive: {
    backgroundColor: '#1a1a1a',
  },
  progressDotComplete: {
    backgroundColor: '#1a1a1a',
  },
  
  // Form elements
  stepTitle: {
    fontFamily: '"Space Grotesk", sans-serif',
    fontSize: '11px',
    fontWeight: '600',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#888',
    marginBottom: '8px',
  },
  stepHeading: {
    fontFamily: '"Space Grotesk", sans-serif',
    fontSize: '24px',
    fontWeight: '400',
    marginBottom: '32px',
    letterSpacing: '-0.01em',
  },
  formGroup: {
    marginBottom: '24px',
  },
  label: {
    display: 'block',
    fontSize: '11px',
    fontWeight: '600',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginBottom: '8px',
    color: '#1a1a1a',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    fontSize: '15px',
    fontFamily: '"Outfit", sans-serif',
    border: '1px solid #ddd',
    borderRadius: '4px',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  },
  select: {
    width: '100%',
    padding: '14px 16px',
    fontSize: '15px',
    fontFamily: '"Outfit", sans-serif',
    border: '1px solid #ddd',
    borderRadius: '4px',
    outline: 'none',
    backgroundColor: '#fff',
    cursor: 'pointer',
  },
  
  // Multi-select chips
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  chip: {
    padding: '10px 16px',
    fontSize: '13px',
    fontFamily: '"Outfit", sans-serif',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#fff',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  chipSelected: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    borderColor: '#1a1a1a',
  },
  
  // Buttons
  buttonRow: {
    display: 'flex',
    gap: '12px',
    marginTop: '32px',
  },
  primaryButton: {
    flex: 1,
    padding: '16px 32px',
    fontSize: '11px',
    fontWeight: '600',
    fontFamily: '"Space Grotesk", sans-serif',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    transition: 'background-color 0.2s ease',
  },
  secondaryButton: {
    padding: '16px 24px',
    fontSize: '11px',
    fontWeight: '500',
    fontFamily: '"Space Grotesk", sans-serif',
    backgroundColor: 'transparent',
    color: '#666',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  googleButton: {
    width: '100%',
    padding: '14px 24px',
    fontSize: '14px',
    fontFamily: '"Outfit", sans-serif',
    backgroundColor: '#fff',
    color: '#1a1a1a',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '24px',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '24px 0',
    color: '#888',
    fontSize: '12px',
    letterSpacing: '0.1em',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    backgroundColor: '#e5e5e5',
  },
  dividerText: {
    padding: '0 16px',
  },
  
  // Main App Layout
  appHeader: {
    padding: '24px 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #e5e5e5',
    backgroundColor: '#fff',
  },
  appLogo: {
    fontFamily: '"Space Grotesk", sans-serif',
    fontSize: '20px',
    fontWeight: '300',
    letterSpacing: '0.2em',
  },
  userMenu: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  userName: {
    fontSize: '14px',
    color: '#666',
  },
  logoutButton: {
    fontSize: '12px',
    color: '#888',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    letterSpacing: '0.05em',
  },
  
  // Main content
  main: {
    maxWidth: '720px',
    margin: '0 auto',
    padding: '48px 24px 80px',
  },
  pageTitle: {
    fontFamily: '"Space Grotesk", sans-serif',
    fontSize: '11px',
    fontWeight: '600',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#888',
    marginBottom: '8px',
  },
  pageHeading: {
    fontFamily: '"Space Grotesk", sans-serif',
    fontSize: '28px',
    fontWeight: '400',
    marginBottom: '32px',
    letterSpacing: '-0.01em',
  },
  
  // Textarea
  textareaContainer: {
    marginBottom: '24px',
  },
  textarea: {
    width: '100%',
    padding: '20px',
    fontSize: '15px',
    lineHeight: '1.7',
    fontFamily: '"Outfit", -apple-system, sans-serif',
    border: '1px solid #ddd',
    borderRadius: '4px',
    resize: 'vertical',
    minHeight: '240px',
    backgroundColor: '#fff',
    outline: 'none',
  },
  hint: {
    fontSize: '13px',
    color: '#888',
    marginTop: '8px',
  },
  
  // Output
  outputSection: {
    backgroundColor: '#fff',
    borderRadius: '4px',
    border: '1px solid #1a1a1a',
    overflow: 'hidden',
    marginTop: '32px',
  },
  outputHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    borderBottom: '1px solid #eee',
    backgroundColor: '#FAFAFA',
  },
  outputLabel: {
    fontSize: '11px',
    fontWeight: '600',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  copyButton: {
    padding: '8px 20px',
    fontSize: '10px',
    fontWeight: '600',
    fontFamily: '"Space Grotesk", sans-serif',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    border: 'none',
    borderRadius: '2px',
    cursor: 'pointer',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  outputContent: {
    padding: '28px 24px',
  },
  outputHeading: {
    fontFamily: '"Space Grotesk", sans-serif',
    fontSize: '12px',
    fontWeight: '600',
    margin: '24px 0 12px 0',
    color: '#1a1a1a',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  outputParagraph: {
    fontSize: '15px',
    lineHeight: '1.75',
    margin: '0 0 8px 0',
    color: '#333',
  },
  outputBullet: {
    fontSize: '15px',
    lineHeight: '1.75',
    margin: '0 0 6px 0',
    paddingLeft: '8px',
    color: '#333',
  },
  
  // Error
  error: {
    padding: '16px 20px',
    backgroundColor: '#FEF2F2',
    color: '#B91C1C',
    borderRadius: '4px',
    fontSize: '14px',
    marginBottom: '24px',
    border: '1px solid #FECACA',
  },
  
  // Success screen
  successIcon: {
    width: '64px',
    height: '64px',
    margin: '0 auto 24px',
    backgroundColor: '#1a1a1a',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '28px',
  },
  successHeading: {
    fontFamily: '"Space Grotesk", sans-serif',
    fontSize: '24px',
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: '12px',
  },
  successText: {
    fontSize: '15px',
    color: '#666',
    textAlign: 'center',
    marginBottom: '32px',
    lineHeight: '1.6',
  },
};

// ============================================
// COMPONENTS
// ============================================

// Progress Dots
const ProgressDots = ({ current, total }) => (
  <div style={styles.progressContainer}>
    {Array.from({ length: total }, (_, i) => (
      <div
        key={i}
        style={{
          ...styles.progressDot,
          ...(i < current ? styles.progressDotComplete : {}),
          ...(i === current ? styles.progressDotActive : {}),
        }}
      />
    ))}
  </div>
);

// Multi-select Chips
const ChipSelect = ({ options, selected, onChange }) => (
  <div style={styles.chipContainer}>
    {options.map((option) => (
      <button
        key={option}
        type="button"
        style={{
          ...styles.chip,
          ...(selected.includes(option) ? styles.chipSelected : {}),
        }}
        onClick={() => {
          if (selected.includes(option)) {
            onChange(selected.filter((s) => s !== option));
          } else {
            onChange([...selected, option]);
          }
        }}
      >
        {option}
      </button>
    ))}
  </div>
);

// ============================================
// MAIN APP
// ============================================
export default function App() {
  const [screen, setScreen] = useState('signup'); // signup, onboarding, app
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [userProfile, setUserProfile] = useState({
    email: '',
    password: '',
    name: '',
    role: '',
    company: '',
    website: '',
    reportsTo: '',
    theirPriorities: [],
    updateFormat: '',
    updateFrequency: '',
    crm: '',
    projectManagement: '',
    analytics: '',
    priorities: ['', '', ''],
    metrics: '',
  });
  
  // App state
  const [rawInput, setRawInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const updateProfile = (field, value) => {
    setUserProfile((prev) => ({ ...prev, [field]: value }));
  };

  const updatePriority = (index, value) => {
    const newPriorities = [...userProfile.priorities];
    newPriorities[index] = value;
    setUserProfile((prev) => ({ ...prev, priorities: newPriorities }));
  };

  // ============================================
  // SIGNUP SCREEN
  // ============================================
  const SignupScreen = () => (
    <div style={styles.authContainer}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { margin: 0; }
        ::selection { background: #1a1a1a; color: #fff; }
        input::placeholder, textarea::placeholder { color: #999; }
        input:focus, select:focus, textarea:focus { border-color: #1a1a1a; }
        button:hover { opacity: 0.9; }
      `}</style>
      
      <div style={styles.authCard}>
        <h1 style={styles.logo}>UPWORDS</h1>
        <p style={styles.tagline}>Raw notes to exec-ready updates</p>
        
        <button style={styles.googleButton}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
            <path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>
        
        <div style={styles.divider}>
          <div style={styles.dividerLine} />
          <span style={styles.dividerText}>OR</span>
          <div style={styles.dividerLine} />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            style={styles.input}
            placeholder="you@company.com"
            value={userProfile.email}
            onChange={(e) => updateProfile('email', e.target.value)}
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            style={styles.input}
            placeholder="Create a password"
            value={userProfile.password}
            onChange={(e) => updateProfile('password', e.target.value)}
          />
        </div>
        
        <button
          style={{ ...styles.primaryButton, width: '100%' }}
          onClick={() => {
            setScreen('onboarding');
            setOnboardingStep(0);
          }}
        >
          Get Started
        </button>
        
        <p style={{ fontSize: '13px', color: '#888', textAlign: 'center', marginTop: '24px' }}>
          Already have an account? <span style={{ color: '#1a1a1a', cursor: 'pointer' }}>Sign in</span>
        </p>
      </div>
    </div>
  );

  // ============================================
  // ONBOARDING STEPS
  // ============================================
  const onboardingSteps = [
    // Step 1: About You
    {
      title: 'Step 1 of 5',
      heading: 'About you',
      content: (
        <>
          <div style={styles.formGroup}>
            <label style={styles.label}>Your name</label>
            <input
              type="text"
              style={styles.input}
              placeholder="Jane Smith"
              value={userProfile.name}
              onChange={(e) => updateProfile('name', e.target.value)}
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Your role</label>
            <select
              style={styles.select}
              value={userProfile.role}
              onChange={(e) => updateProfile('role', e.target.value)}
            >
              <option value="">Select your role</option>
              <option value="Head of Marketing">Head of Marketing</option>
              <option value="VP Marketing">VP Marketing</option>
              <option value="Head of Sales">Head of Sales</option>
              <option value="VP Sales">VP Sales</option>
              <option value="Head of Product">Head of Product</option>
              <option value="VP Product">VP Product</option>
              <option value="Head of Engineering">Head of Engineering</option>
              <option value="VP Engineering">VP Engineering</option>
              <option value="Head of Operations">Head of Operations</option>
              <option value="VP Operations">VP Operations</option>
              <option value="Head of Customer Success">Head of Customer Success</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Company name</label>
            <input
              type="text"
              style={styles.input}
              placeholder="Acme Inc"
              value={userProfile.company}
              onChange={(e) => updateProfile('company', e.target.value)}
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Company website</label>
            <input
              type="text"
              style={styles.input}
              placeholder="www.acme.com"
              value={userProfile.website}
              onChange={(e) => updateProfile('website', e.target.value)}
            />
          </div>
        </>
      ),
    },
    
    // Step 2: Who you report to
    {
      title: 'Step 2 of 5',
      heading: 'Who you report to',
      content: (
        <>
          <div style={styles.formGroup}>
            <label style={styles.label}>You report to</label>
            <select
              style={styles.select}
              value={userProfile.reportsTo}
              onChange={(e) => updateProfile('reportsTo', e.target.value)}
            >
              <option value="">Select who you report to</option>
              <option value="CEO">CEO</option>
              <option value="COO">COO</option>
              <option value="CRO">CRO</option>
              <option value="CMO">CMO</option>
              <option value="CFO">CFO</option>
              <option value="CTO">CTO</option>
              <option value="VP">VP</option>
              <option value="Director">Director</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>What matters most to them?</label>
            <ChipSelect
              options={[
                'Revenue growth',
                'Pipeline',
                'Efficiency',
                'Product velocity',
                'Customer retention',
                'Team performance',
                'Market expansion',
                'Cost reduction',
              ]}
              selected={userProfile.theirPriorities}
              onChange={(value) => updateProfile('theirPriorities', value)}
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Their preferred update format</label>
            <select
              style={styles.select}
              value={userProfile.updateFormat}
              onChange={(e) => updateProfile('updateFormat', e.target.value)}
            >
              <option value="">Select format</option>
              <option value="bullets">Quick bullets</option>
              <option value="detailed">Detailed breakdown</option>
              <option value="narrative">Narrative style</option>
            </select>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>How often do you update them?</label>
            <select
              style={styles.select}
              value={userProfile.updateFrequency}
              onChange={(e) => updateProfile('updateFrequency', e.target.value)}
            >
              <option value="">Select frequency</option>
              <option value="weekly">Weekly</option>
              <option value="fortnightly">Fortnightly</option>
              <option value="monthly">Monthly</option>
              <option value="adhoc">Ad hoc</option>
            </select>
          </div>
        </>
      ),
    },
    
    // Step 3: Your stack
    {
      title: 'Step 3 of 5',
      heading: 'Your stack',
      content: (
        <>
          <div style={styles.formGroup}>
            <label style={styles.label}>CRM</label>
            <select
              style={styles.select}
              value={userProfile.crm}
              onChange={(e) => updateProfile('crm', e.target.value)}
            >
              <option value="">Select your CRM</option>
              <option value="HubSpot">HubSpot</option>
              <option value="Salesforce">Salesforce</option>
              <option value="Pipedrive">Pipedrive</option>
              <option value="Close">Close</option>
              <option value="Zoho">Zoho CRM</option>
              <option value="None">None</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Project management</label>
            <select
              style={styles.select}
              value={userProfile.projectManagement}
              onChange={(e) => updateProfile('projectManagement', e.target.value)}
            >
              <option value="">Select your PM tool</option>
              <option value="Jira">Jira</option>
              <option value="ClickUp">ClickUp</option>
              <option value="Asana">Asana</option>
              <option value="Linear">Linear</option>
              <option value="Monday">Monday.com</option>
              <option value="Notion">Notion</option>
              <option value="Trello">Trello</option>
              <option value="None">None</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Analytics</label>
            <select
              style={styles.select}
              value={userProfile.analytics}
              onChange={(e) => updateProfile('analytics', e.target.value)}
            >
              <option value="">Select your analytics</option>
              <option value="Google Analytics">Google Analytics</option>
              <option value="Mixpanel">Mixpanel</option>
              <option value="Amplitude">Amplitude</option>
              <option value="Heap">Heap</option>
              <option value="PostHog">PostHog</option>
              <option value="None">None</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </>
      ),
    },
    
    // Step 4: Your priorities
    {
      title: 'Step 4 of 5',
      heading: 'Your priorities',
      content: (
        <>
          <div style={styles.formGroup}>
            <label style={styles.label}>Top 3 priorities this quarter</label>
            <input
              type="text"
              style={{ ...styles.input, marginBottom: '12px' }}
              placeholder="Priority 1"
              value={userProfile.priorities[0]}
              onChange={(e) => updatePriority(0, e.target.value)}
            />
            <input
              type="text"
              style={{ ...styles.input, marginBottom: '12px' }}
              placeholder="Priority 2"
              value={userProfile.priorities[1]}
              onChange={(e) => updatePriority(1, e.target.value)}
            />
            <input
              type="text"
              style={styles.input}
              placeholder="Priority 3"
              value={userProfile.priorities[2]}
              onChange={(e) => updatePriority(2, e.target.value)}
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Key metrics you own</label>
            <input
              type="text"
              style={styles.input}
              placeholder="e.g. MQLs, pipeline, website traffic, NPS"
              value={userProfile.metrics}
              onChange={(e) => updateProfile('metrics', e.target.value)}
            />
          </div>
        </>
      ),
    },
    
    // Step 5: Done
    {
      title: 'Step 5 of 5',
      heading: '',
      content: (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={styles.successIcon}>✓</div>
          <h2 style={styles.successHeading}>You're all set</h2>
          <p style={styles.successText}>
            Upwords now knows your context. Every update will be tailored for {userProfile.reportsTo || 'your manager'} and focused on what matters to them.
          </p>
        </div>
      ),
    },
  ];

  const OnboardingScreen = () => {
    const step = onboardingSteps[onboardingStep];
    const isLastStep = onboardingStep === onboardingSteps.length - 1;
    
    return (
      <div style={styles.authContainer}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { margin: 0; }
          ::selection { background: #1a1a1a; color: #fff; }
          input::placeholder { color: #999; }
          input:focus, select:focus { border-color: #1a1a1a; }
          button:hover { opacity: 0.9; }
        `}</style>
        
        <div style={styles.authCard}>
          <ProgressDots current={onboardingStep} total={onboardingSteps.length} />
          
          {step.title && <p style={styles.stepTitle}>{step.title}</p>}
          {step.heading && <h2 style={styles.stepHeading}>{step.heading}</h2>}
          
          {step.content}
          
          <div style={styles.buttonRow}>
            {onboardingStep > 0 && !isLastStep && (
              <button
                style={styles.secondaryButton}
                onClick={() => setOnboardingStep((s) => s - 1)}
              >
                Back
              </button>
            )}
            
            <button
              style={styles.primaryButton}
              onClick={() => {
                if (isLastStep) {
                  setScreen('app');
                } else {
                  setOnboardingStep((s) => s + 1);
                }
              }}
            >
              {isLastStep ? 'Start Writing' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ============================================
  // MAIN APP SCREEN
  // ============================================
  const transformUpdate = async () => {
    if (!rawInput.trim()) {
      setError('Please add some notes to transform');
      return;
    }

    setIsLoading(true);
    setError('');
    setOutput('');

    try {
      const response = await fetch('/api/transform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rawNotes: rawInput,
          userProfile: userProfile,
        }),
      });

      const data = await response.json();

      if (data.output) {
        setOutput(data.output);
      } else if (data.error) {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to connect. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError('Failed to copy');
    }
  };

  const AppScreen = () => (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { margin: 0; }
        ::selection { background: #1a1a1a; color: #fff; }
        textarea::placeholder { color: #888; }
        textarea:focus { border-color: #1a1a1a; }
        button:hover { opacity: 0.9; }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      
      <header style={styles.appHeader}>
        <div style={styles.appLogo}>UPWORDS</div>
        <div style={styles.userMenu}>
          <span style={styles.userName}>{userProfile.name}</span>
          <button
            style={styles.logoutButton}
            onClick={() => setScreen('signup')}
          >
            Sign out
          </button>
        </div>
      </header>
      
      <main style={styles.main}>
        <p style={styles.pageTitle}>New Update</p>
        <h1 style={styles.pageHeading}>What happened this week?</h1>
        
        <div style={styles.textareaContainer}>
          <textarea
            style={styles.textarea}
            value={rawInput}
            onChange={(e) => setRawInput(e.target.value)}
            placeholder="Dump your raw notes here. Wins, blockers, metrics, concerns, asks. Don't worry about structure or polish."
          />
          <p style={styles.hint}>
            Your update will be tailored for your {userProfile.reportsTo}, focused on {userProfile.theirPriorities.slice(0, 2).join(' and ') || 'what matters to them'}.
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            style={{
              ...styles.primaryButton,
              flex: 'none',
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer',
            }}
            onClick={transformUpdate}
            disabled={isLoading}
          >
            {isLoading ? (
              <span style={{ animation: 'pulse 1.5s ease-in-out infinite' }}>Transforming...</span>
            ) : (
              'Transform'
            )}
          </button>
          
          {rawInput && (
            <button
              style={styles.secondaryButton}
              onClick={() => {
                setRawInput('');
                setOutput('');
              }}
            >
              Clear
            </button>
          )}
        </div>
        
        {error && <div style={{ ...styles.error, marginTop: '24px' }}>{error}</div>}
        
        {output && (
          <div style={{ ...styles.outputSection, animation: 'fadeIn 0.4s ease-out' }}>
            <div style={styles.outputHeader}>
              <span style={styles.outputLabel}>Your {userProfile.reportsTo} update</span>
              <button style={styles.copyButton} onClick={copyToClipboard}>
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
            <div style={styles.outputContent}>
              {output.split('\n').map((line, i) => {
                if (line.startsWith('**') && line.endsWith('**')) {
                  return (
                    <h3 key={i} style={styles.outputHeading}>
                      {line.replace(/\*\*/g, '')}
                    </h3>
                  );
                }
                if (line.startsWith('- ') || line.startsWith('• ')) {
                  return (
                    <p key={i} style={styles.outputBullet}>
                      {line}
                    </p>
                  );
                }
                if (line.trim() === '') {
                  return <div key={i} style={{ height: '12px' }} />;
                }
                return (
                  <p key={i} style={styles.outputParagraph}>
                    {line.replace(/\*\*/g, '')}
                  </p>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );

  // ============================================
  // RENDER
  // ============================================
  if (screen === 'signup') return <SignupScreen />;
  if (screen === 'onboarding') return <OnboardingScreen />;
  return <AppScreen />;
}
