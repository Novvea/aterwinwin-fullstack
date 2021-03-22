import './HamburgerButton.css'

export const HamburgerButton = (props: {sideBarHandler: Function}) => {
  return (
      <button className='toggleHamburgerButton' onClick={() => props.sideBarHandler(true)}>
        <div className='toggleHamburgerButtonLine'></div>
        <div className='toggleHamburgerButtonLine'></div>
        <div className='toggleHamburgerButtonLine'></div>
      </button>
  )
}
