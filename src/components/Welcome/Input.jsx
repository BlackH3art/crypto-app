const Input = ({ placeholder, name, type, value, handleChange }) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      step="0.0001"
      name={name}
      onChange={(e) => handleChange(e, name)}
      value={value}
      className="my-2 w-full rounded-sm p-2 outlined-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
  )
}

export default Input;