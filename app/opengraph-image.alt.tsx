import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const alt = 'gh-manager-cli - Terminal UI for GitHub Repository Management'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
// This would use the static image, but for now we'll keep the dynamic one
// To use the static poster image, we would export it directly:
// export { default } from '/public/app-demo-poster.jpg'

// Keep the dynamic version for now
export { default } from './opengraph-image'