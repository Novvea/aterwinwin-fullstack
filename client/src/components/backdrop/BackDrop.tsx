import './BackDrop.css'

export const BackDrop = (props: {sideBarHandler: Function}) => {
  return (
    <div onClick={() => props.sideBarHandler(false)} className='backDrop'>
      
    </div>
  )
}
