const Loading = ({ size }) => {

  return (
    <>
      <div className="flex justify-center items-center py-3">
        <div className={`animate-spin rounded-full h-${size} w-${size} border-b-2 border-red-700`} />
      </div>
    </>
  )
}

export default Loading;