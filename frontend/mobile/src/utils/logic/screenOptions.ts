interface ScreenOptionsProps {
  title?: string
  headerShown?: boolean
  isSignout?: boolean
}

export const commonScreenOptions = ({
  title = '',
  headerShown = false,
  isSignout = false,
}: ScreenOptionsProps = {}): {
  title: string
  headerShown: boolean
  animationTypeForReplace: 'pop' | 'push'
} => {
  return {
    title,
    headerShown,
    animationTypeForReplace: isSignout ? 'pop' : 'push',
  }
}
