import React from 'react'
import ReduxProvider from './__store/ReduxProvider';

type Props = {
  children: React.ReactNode;
}

const clientLayout = (props: Props) => {
  return (
    <ReduxProvider>
      {props.children}
    </ReduxProvider>
  )
}

export default clientLayout