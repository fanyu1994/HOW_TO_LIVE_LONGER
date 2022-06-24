export default function Head (props = { title:" hello fanyu" }) {
  const { title } = props
    return (
      <div>
        <div>head --{">"} {title}</div>
      </div>
    )
  }