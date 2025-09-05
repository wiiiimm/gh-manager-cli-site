import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'gh-manager-cli - The Terminal Alternative to GitHub.com'
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
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          background: '#000000',
        }}
      >
        {/* Left side - GitHub.com Problems */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #1a0000 0%, #2a0000 100%)',
            borderRight: '3px solid #333',
            padding: 40,
          }}
        >
          <div
            style={{
              fontSize: 32,
              color: '#ef4444',
              fontFamily: 'monospace',
              marginBottom: 30,
              fontWeight: 'bold',
            }}
          >
            ❌ GitHub.com
          </div>
          
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              fontSize: 20,
              color: '#a1a1aa',
              fontFamily: 'monospace',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: '#ef4444' }}>✕</span>
              <span>20 repos per page</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: '#ef4444' }}>✕</span>
              <span>Click → Settings → Action</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: '#ef4444' }}>✕</span>
              <span>No bulk operations</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: '#ef4444' }}>✕</span>
              <span>Page refresh each action</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: '#ef4444' }}>✕</span>
              <span>No keyboard shortcuts</span>
            </div>
          </div>
          
          <div
            style={{
              marginTop: 40,
              fontSize: 48,
              color: '#ef4444',
              fontWeight: 'bold',
            }}
          >
            ~1 hour
          </div>
          <div
            style={{
              fontSize: 18,
              color: '#a1a1aa',
              fontFamily: 'monospace',
            }}
          >
            to manage 50 repos
          </div>
        </div>

        {/* Right side - gh-manager-cli Solution */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #001a00 0%, #002a00 100%)',
            padding: 40,
            position: 'relative',
          }}
        >
          {/* Green glow effect */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 400,
              height: 400,
              background: 'radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%)',
              transform: 'translate(-50%, -50%)',
            }}
          />
          
          <div
            style={{
              fontSize: 32,
              color: '#22c55e',
              fontFamily: 'monospace',
              marginBottom: 30,
              fontWeight: 'bold',
              zIndex: 1,
            }}
          >
            ✅ gh-manager-cli
          </div>
          
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              fontSize: 20,
              color: '#a1a1aa',
              fontFamily: 'monospace',
              zIndex: 1,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: '#22c55e' }}>✓</span>
              <span>All repos, infinite scroll</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: '#22c55e' }}>✓</span>
              <span>Single keypress actions</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: '#22c55e' }}>✓</span>
              <span>Batch archive & delete</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: '#22c55e' }}>✓</span>
              <span>Instant, no page reload</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: '#22c55e' }}>✓</span>
              <span>Full keyboard control</span>
            </div>
          </div>
          
          <div
            style={{
              marginTop: 40,
              fontSize: 48,
              color: '#22c55e',
              fontWeight: 'bold',
              zIndex: 1,
            }}
          >
            5 minutes
          </div>
          <div
            style={{
              fontSize: 18,
              color: '#a1a1aa',
              fontFamily: 'monospace',
              zIndex: 1,
            }}
          >
            to clean up everything
          </div>
        </div>

        {/* Center divider with logo and command */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
            zIndex: 10,
          }}
        >
          {/* Logo circle */}
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: '#000000',
              border: '4px solid #22c55e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 40px rgba(34, 197, 94, 0.5)',
            }}
          >
            <div
              style={{
                fontSize: 48,
                color: '#22c55e',
                fontWeight: 'bold',
              }}
            >
              {'</>'}
            </div>
          </div>
          
          {/* Command */}
          <div
            style={{
              padding: '12px 24px',
              background: '#000000',
              border: '2px solid #22c55e',
              borderRadius: 8,
              fontSize: 16,
              color: '#22c55e',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)',
            }}
          >
            npx gh-manager-cli@latest
          </div>
          
          {/* Website */}
          <div
            style={{
              fontSize: 14,
              color: '#64748b',
              fontFamily: 'monospace',
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