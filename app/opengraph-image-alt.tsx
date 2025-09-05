import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'gh-manager-cli - Stop Clicking Through GitHub.com'
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
          background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(34, 197, 94, 0.03) 39px, rgba(34, 197, 94, 0.03) 40px),
              repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(34, 197, 94, 0.03) 39px, rgba(34, 197, 94, 0.03) 40px)
            `,
          }}
        />
        
        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 60,
            gap: 40,
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* Top badge */}
          <div
            style={{
              padding: '8px 20px',
              background: 'rgba(34, 197, 94, 0.1)',
              border: '2px solid #22c55e',
              borderRadius: 999,
              fontSize: 18,
              color: '#22c55e',
              fontFamily: 'monospace',
              fontWeight: 600,
              letterSpacing: '0.5px',
            }}
          >
            GITHUB REPOSITORY MANAGEMENT
          </div>
          
          {/* Main headline with emphasis */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 20,
            }}
          >
            <div
              style={{
                fontSize: 56,
                color: '#ffffff',
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 800,
                textAlign: 'center',
                lineHeight: 1.1,
              }}
            >
              Stop Clicking Through
            </div>
            <div
              style={{
                fontSize: 56,
                color: '#ef4444',
                fontFamily: 'system-ui, sans-serif',
                fontWeight: 800,
                textAlign: 'center',
                lineHeight: 1.1,
                textDecoration: 'line-through',
                opacity: 0.9,
              }}
            >
              GitHub.com's Slow UI
            </div>
          </div>
          
          {/* Value proposition */}
          <div
            style={{
              fontSize: 32,
              color: '#94a3b8',
              fontFamily: 'system-ui, sans-serif',
              textAlign: 'center',
              maxWidth: 800,
              lineHeight: 1.3,
            }}
          >
            Clean up 50+ repos in 5 minutes
            <br />
            with powerful keyboard shortcuts
          </div>
          
          {/* Visual comparison */}
          <div
            style={{
              display: 'flex',
              gap: 60,
              alignItems: 'center',
              marginTop: 20,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <div
                style={{
                  fontSize: 24,
                  color: '#ef4444',
                  fontFamily: 'monospace',
                }}
              >
                GitHub.com
              </div>
              <div
                style={{
                  fontSize: 48,
                  color: '#ef4444',
                  fontWeight: 'bold',
                }}
              >
                1 hour
              </div>
            </div>
            
            <div
              style={{
                fontSize: 48,
                color: '#22c55e',
                fontWeight: 'bold',
              }}
            >
              →
            </div>
            
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <div
                style={{
                  fontSize: 24,
                  color: '#22c55e',
                  fontFamily: 'monospace',
                }}
              >
                gh-manager-cli
              </div>
              <div
                style={{
                  fontSize: 48,
                  color: '#22c55e',
                  fontWeight: 'bold',
                }}
              >
                5 min
              </div>
            </div>
          </div>
          
          {/* Command prompt */}
          <div
            style={{
              marginTop: 20,
              padding: '20px 40px',
              background: '#000000',
              border: '2px solid #22c55e',
              borderRadius: 12,
              fontSize: 28,
              color: '#22c55e',
              fontFamily: 'monospace',
              fontWeight: 600,
              boxShadow: '0 0 40px rgba(34, 197, 94, 0.3)',
            }}
          >
            $ npx gh-manager-cli@latest
          </div>
          
          {/* Website URL */}
          <div
            style={{
              fontSize: 20,
              color: '#64748b',
              fontFamily: 'monospace',
              marginTop: -10,
            }}
          >
            gh-manager-cli.dev
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}