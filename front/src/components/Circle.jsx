function Circle() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <svg width="100%" height="100%">
        <circle
          cx="50%"
          cy="50%"
          r="500" 
          fill="none"
          stroke="rgb(240,240,240)"
          strokeWidth="70" 
        />
      </svg>
    </div>
  );
}

export default Circle