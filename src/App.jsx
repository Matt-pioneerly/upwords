import { useState } from 'react';

// ============================================
// STYLES (outside component)
// ============================================
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#F5F5F3',
    fontFamily: '"Outfit", -apple-system, sans-serif',
    color: '#1a1a1a',
  },
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
  },
  progressDotActive: {
    backgroundColor: '#1a1a1a',
  },
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
    boxSizing: 'border-box',
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
    boxSizing: 'border-box',
  },
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
  },
  chipSelected: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    borderColor: '#1a1a1a',
  },
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
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    backgroundColor: '#e5e5e5',
  },
  dividerText: {
    padding: '0 16px',
  },
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
  },
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
  },
  textarea: {
    width: '100%',
    padding: '20px',
    fontSize: '15px',
    lineHeight: '1.7',
    fontFamily: '"Outfit", sans-serif',
    border: '1px solid #ddd',
    borderRadius: '4px',
    resize: 'vertical',
    minHeight: '240px',
    backgroundColor: '#fff',
    outline: 'none',
    boxSizing: 'border-box',
  },
  hint: {
    fontSize: '13px',
    color: '#888',
    marginTop: '8px',
  },
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
  error: {
    padding: '16px 20px',
    backgroundColor: '#FEF2F2',
    color: '#B91C1C',
    borderRadius: '4px',
    fontSize: '14px',
    marginTop: '24px',
    border: '1px solid #FECACA',
  },
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

export default function App() {
  const [screen, setScreen] = useState('signup');
  const [step, setStep] = useState(0);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [reportsTo, setReportsTo] = useState('');
  const [theirPriorities, setTheirPriorities] = useState([]);
  const [updateFormat, setUpdateFormat] = useState('');
  const [updateFrequency, setUpdateFrequency] = useState('');
  const [crm, setCrm] = useState('');
  const [pm, setPm] = useState('');
  const [analytics, setAnalytics] = useState('');
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');
  const [p3, setP3] = useState('');
  const [metrics, setMetrics] = useState('');
  
  const [rawInput, setRawInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const togglePriority = (p) => {
    setTheirPriorities(prev => 
      prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
    );
  };

  const transform = async () => {
    if (!rawInput.trim()) {
      setError('Please add some notes');
      return;
    }
    setIsLoading(true);
    setError('');
    setOutput('');
    try {
      const res = await fetch('/api/transform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawNotes: rawInput,
          userProfile: { name, role, company, reportsTo, theirPriorities, updateFormat, priorities: [p1, p2, p3], metrics }
        }),
      });
      const data = await res.json();
      if (data.output) setOutput(data.output);
      else if (data.error) setError(data.error);
    } catch {
      setError('Failed to connect');
    }
    setIsLoading(false);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // SIGNUP
  if (screen === 'signup') {
    return (
      <div style={styles.authContainer}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600&family=Outfit:wght@300;400;500;600&display=swap');
          *{box-sizing:border-box;margin:0;padding:0}
          input:focus,select:focus,textarea:focus{border-color:#1a1a1a!important}
        `}</style>
        <div style={styles.authCard}>
          <h1 style={styles.logo}>UPWORDS</h1>
          <p style={styles.tagline}>Raw notes to exec-ready updates</p>
          
          <button style={styles.googleButton} type="button">
            <svg width="18" height="18" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/><path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>
            Continue with Google
          </button>
          
          <div style={styles.divider}>
            <div style={styles.dividerLine}/><span style={styles.dividerText}>OR</span><div style={styles.dividerLine}/>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input type="email" style={styles.input} placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)}/>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input type="password" style={styles.input} placeholder="Create a password" value={password} onChange={e => setPassword(e.target.value)}/>
          </div>
          
          <button type="button" style={{...styles.primaryButton, width:'100%'}} onClick={() => { setScreen('onboarding'); setStep(0); }}>
            Get Started
          </button>
          
          <p style={{fontSize:'13px',color:'#888',textAlign:'center',marginTop:'24px'}}>
            Already have an account? <span style={{color:'#1a1a1a',cursor:'pointer'}}>Sign in</span>
          </p>
        </div>
      </div>
    );
  }

  // ONBOARDING
  if (screen === 'onboarding') {
    return (
      <div style={styles.authContainer}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600&family=Outfit:wght@300;400;500;600&display=swap');
          *{box-sizing:border-box;margin:0;padding:0}
          input:focus,select:focus{border-color:#1a1a1a!important}
        `}</style>
        <div style={styles.authCard}>
          <div style={styles.progressContainer}>
            {[0,1,2,3,4].map(i => <div key={i} style={{...styles.progressDot, ...(i <= step ? styles.progressDotActive : {})}}/>)}
          </div>

          {step === 0 && <>
            <p style={styles.stepTitle}>Step 1 of 5</p>
            <h2 style={styles.stepHeading}>About you</h2>
            <div style={styles.formGroup}>
              <label style={styles.label}>Your name</label>
              <input type="text" style={styles.input} placeholder="Jane Smith" value={name} onChange={e => setName(e.target.value)}/>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Your role</label>
              <select style={styles.select} value={role} onChange={e => setRole(e.target.value)}>
                <option value="">Select your role</option>
                <option>CMO</option>
                <option>VP Marketing</option>
                <option>Head of Marketing</option>
                <option>Marketing Director</option>
                <option>Marketing Manager</option>
                <option>Other</option>
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Company name</label>
              <input type="text" style={styles.input} placeholder="Acme Inc" value={company} onChange={e => setCompany(e.target.value)}/>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Company website</label>
              <input type="text" style={styles.input} placeholder="www.acme.com" value={website} onChange={e => setWebsite(e.target.value)}/>
            </div>
          </>}

          {step === 1 && <>
            <p style={styles.stepTitle}>Step 2 of 5</p>
            <h2 style={styles.stepHeading}>Who you report to</h2>
            <div style={styles.formGroup}>
              <label style={styles.label}>You report to</label>
              <select style={styles.select} value={reportsTo} onChange={e => setReportsTo(e.target.value)}>
                <option value="">Select who you report to</option>
                <option>CEO</option>
                <option>CRO</option>
                <option>COO</option>
                <option>CMO</option>
                <option>VP</option>
                <option>Other</option>
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>What matters most to them?</label>
              <div style={styles.chipContainer}>
                {['Revenue growth','Pipeline','Efficiency','Product velocity','Customer retention','Team performance','Market expansion','Cost reduction'].map(p => (
                  <button key={p} type="button" style={{...styles.chip, ...(theirPriorities.includes(p) ? styles.chipSelected : {})}} onClick={() => togglePriority(p)}>{p}</button>
                ))}
              </div>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Their preferred format</label>
              <select style={styles.select} value={updateFormat} onChange={e => setUpdateFormat(e.target.value)}>
                <option value="">Select format</option>
                <option value="bullets">Quick bullets</option>
                <option value="detailed">Detailed breakdown</option>
                <option value="narrative">Narrative style</option>
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>How often do you update them?</label>
              <select style={styles.select} value={updateFrequency} onChange={e => setUpdateFrequency(e.target.value)}>
                <option value="">Select frequency</option>
                <option>Weekly</option>
                <option>Fortnightly</option>
                <option>Monthly</option>
                <option>Ad hoc</option>
              </select>
            </div>
          </>}

          {step === 2 && <>
            <p style={styles.stepTitle}>Step 3 of 5</p>
            <h2 style={styles.stepHeading}>Your stack</h2>
            <div style={styles.formGroup}>
              <label style={styles.label}>CRM</label>
              <select style={styles.select} value={crm} onChange={e => setCrm(e.target.value)}>
                <option value="">Select your CRM</option>
                <option>HubSpot</option>
                <option>Salesforce</option>
                <option>Pipedrive</option>
                <option>Close</option>
                <option>Zoho CRM</option>
                <option>None</option>
                <option>Other</option>
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Project management</label>
              <select style={styles.select} value={pm} onChange={e => setPm(e.target.value)}>
                <option value="">Select your PM tool</option>
                <option>Jira</option>
                <option>ClickUp</option>
                <option>Asana</option>
                <option>Linear</option>
                <option>Monday.com</option>
                <option>Notion</option>
                <option>Trello</option>
                <option>None</option>
                <option>Other</option>
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Analytics</label>
              <select style={styles.select} value={analytics} onChange={e => setAnalytics(e.target.value)}>
                <option value="">Select your analytics</option>
                <option>Google Analytics</option>
                <option>Mixpanel</option>
                <option>Amplitude</option>
                <option>Heap</option>
                <option>PostHog</option>
                <option>None</option>
                <option>Other</option>
              </select>
            </div>
          </>}

          {step === 3 && <>
            <p style={styles.stepTitle}>Step 4 of 5</p>
            <h2 style={styles.stepHeading}>Your priorities</h2>
            <div style={styles.formGroup}>
              <label style={styles.label}>Top 3 priorities this quarter</label>
              <input type="text" style={{...styles.input, marginBottom:'12px'}} placeholder="Priority 1" value={p1} onChange={e => setP1(e.target.value)}/>
              <input type="text" style={{...styles.input, marginBottom:'12px'}} placeholder="Priority 2" value={p2} onChange={e => setP2(e.target.value)}/>
              <input type="text" style={styles.input} placeholder="Priority 3" value={p3} onChange={e => setP3(e.target.value)}/>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Key metrics you own</label>
              <input type="text" style={styles.input} placeholder="e.g. MQLs, pipeline, website traffic" value={metrics} onChange={e => setMetrics(e.target.value)}/>
            </div>
          </>}

          {step === 4 && <div style={{textAlign:'center',padding:'20px 0'}}>
            <div style={styles.successIcon}>✓</div>
            <h2 style={styles.successHeading}>You're all set</h2>
            <p style={styles.successText}>Upwords now knows your context. Every update will be tailored for {reportsTo || 'your manager'}.</p>
          </div>}

          <div style={styles.buttonRow}>
            {step > 0 && step < 4 && <button type="button" style={styles.secondaryButton} onClick={() => setStep(step - 1)}>Back</button>}
            <button type="button" style={styles.primaryButton} onClick={() => step === 4 ? setScreen('app') : setStep(step + 1)}>
              {step === 4 ? 'Start Writing' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // MAIN APP
  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600&family=Outfit:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        textarea:focus{border-color:#1a1a1a!important}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
      <header style={styles.appHeader}>
        <div style={styles.appLogo}>UPWORDS</div>
        <div style={styles.userMenu}>
          <span style={styles.userName}>{name}</span>
          <button type="button" style={styles.logoutButton} onClick={() => setScreen('signup')}>Sign out</button>
        </div>
      </header>
      
      <main style={styles.main}>
        <p style={styles.pageTitle}>New Update</p>
        <h1 style={styles.pageHeading}>What happened this week?</h1>
        
        <div style={{marginBottom:'24px'}}>
          <textarea style={styles.textarea} value={rawInput} onChange={e => setRawInput(e.target.value)} placeholder="Dump your raw notes here. Wins, blockers, metrics, concerns, asks."/>
          <p style={styles.hint}>Your update will be tailored for your {reportsTo}, focused on {theirPriorities.slice(0,2).join(' and ') || 'what matters to them'}.</p>
        </div>
        
        <div style={{display:'flex',gap:'12px'}}>
          <button type="button" style={{...styles.primaryButton,flex:'none',opacity:isLoading?0.7:1}} onClick={transform} disabled={isLoading}>
            {isLoading ? <span style={{animation:'pulse 1.5s infinite'}}>Transforming...</span> : 'Transform'}
          </button>
          {rawInput && <button type="button" style={styles.secondaryButton} onClick={() => {setRawInput('');setOutput('');}}>Clear</button>}
        </div>
        
        {error && <div style={styles.error}>{error}</div>}
        
        {output && <div style={{...styles.outputSection,animation:'fadeIn 0.4s'}}>
          <div style={styles.outputHeader}>
            <span style={styles.outputLabel}>Your {reportsTo} update</span>
            <button type="button" style={styles.copyButton} onClick={copy}>{copied ? '✓ Copied' : 'Copy'}</button>
          </div>
          <div style={styles.outputContent}>
            {output.split('\n').map((line, i) => {
              if (line.startsWith('**') && line.endsWith('**')) return <h3 key={i} style={styles.outputHeading}>{line.replace(/\*\*/g,'')}</h3>;
              if (line.startsWith('- ')) return <p key={i} style={styles.outputParagraph}>{line}</p>;
              if (!line.trim()) return <div key={i} style={{height:'12px'}}/>;
              return <p key={i} style={styles.outputParagraph}>{line.replace(/\*\*/g,'')}</p>;
            })}
          </div>
        </div>}
      </main>
    </div>
  );
}
