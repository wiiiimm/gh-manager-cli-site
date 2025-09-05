import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'gh-manager-cli - Clean Up Your GitHub in 5 Minutes'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Terminal window frame */}
        <div
          style={{
            position: 'absolute',
            top: 60,
            left: 60,
            right: 60,
            bottom: 60,
            border: '3px solid #22c55e',
            borderRadius: 16,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Terminal header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '20px 24px',
              borderBottom: '2px solid #22c55e',
              gap: 12,
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: '#ef4444',
              }}
            />
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: '#eab308',
              }}
            />
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: '#22c55e',
              }}
            />
          </div>
          
          {/* Content */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 48,
            }}
          >
            {/* Logo and name */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 24,
                marginBottom: 32,
              }}
            >
              {/* Logo mark */}
              <svg
                width="80"
                height="80"
                viewBox="0 0 256 256"
                fill="none"
              >
                <rect x="8" y="8" width="240" height="240" rx="28" fill="transparent" stroke="#22c55e" strokeWidth="8"/>
                <circle cx="46" cy="32" r="8" fill="#22c55e"/>
                <circle cx="66" cy="32" r="8" fill="#22c55e"/>
                <circle cx="86" cy="32" r="8" fill="#22c55e"/>
                <path d="M40 100L40 156L90 128L40 100Z" fill="#22c55e"/>
                <rect x="104" y="148" width="40" height="4" rx="2" fill="#22c55e"/>
                <polygon points="186,104 196,124 218,124 201,138 211,158 186,144 161,158 171,138 154,124 176,124" fill="#22c55e"/>
                <circle cx="168" cy="168" r="12" fill="#22c55e"/>
                <circle cx="188" cy="188" r="12" fill="#22c55e"/>
                <circle cx="208" cy="168" r="12" fill="#22c55e"/>
                <line x1="180" y1="180" x2="188" y2="188" stroke="#22c55e" strokeWidth="4"/>
                <line x1="196" y1="180" x2="188" y2="188" stroke="#22c55e" strokeWidth="4"/>
                <line x1="188" y1="176" x2="188" y2="168" stroke="#22c55e" strokeWidth="4"/>
              </svg>
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 700,
                  color: '#22c55e',
                  fontFamily: 'monospace',
                }}
              >
                gh-manager-cli
              </div>
            </div>
            
            {/* Tagline */}
            <div
              style={{
                fontSize: 36,
                color: '#ffffff',
                marginBottom: 16,
                textAlign: 'center',
                fontFamily: 'monospace',
              }}
            >
              Clean Up Your GitHub in 5 Minutes
            </div>
            
            {/* Description */}
            <div
              style={{
                fontSize: 24,
                color: '#94a3b8',
                textAlign: 'center',
                fontFamily: 'monospace',
                maxWidth: 900,
              }}
            >
              Stop clicking through GitHub's slow web UI.
            </div>
            <div
              style={{
                fontSize: 24,
                color: '#94a3b8',
                textAlign: 'center',
                fontFamily: 'monospace',
                maxWidth: 900,
              }}
            >
              Archive, delete, and organize repos with keyboard shortcuts.
            </div>
            
            {/* Command prompt */}
            <div
              style={{
                marginTop: 48,
                padding: '16px 32px',
                background: 'rgba(34, 197, 94, 0.1)',
                border: '2px solid #22c55e',
                borderRadius: 8,
                fontSize: 28,
                color: '#22c55e',
                fontFamily: 'monospace',
              }}
            >
              $ npx gh-manager-cli@latest
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}