import { useEffect } from 'react'
import { useSpeechContext } from "@speechly/react-client";

function SpeechlyApp() {
  const { segment } = useSpeechContext()

  useEffect(() => {
    if (segment) {
      // Handle speech segment and make tentative changes to app state
      console.log(segment);
      if (segment.isFinal) {
        // Handle speech segment and make permanent changes to app state
        console.log("✅", segment)
      }
    }
  }, [segment])
}