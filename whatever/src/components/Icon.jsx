export default function Icon({kind, color}) {

  let classNames = "fa-solid fa-octopus"
  if (kind === "ghost") {
    classNames = "fa-solid fa-ghost"
  } else   if (kind === "octopus") {
    classNames = "fa-solid fa-octopus"
  }

  let style = {color: '#000000'}
  if (color === "gray") {
    style = {color: '#bbbbbb'}
  } else if(color === "purple") {
    style = {color: '#dab1da'}
  }
  return <i className={classNames} style={style}></i>

}