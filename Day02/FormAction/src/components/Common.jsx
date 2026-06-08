function Common() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <button type="submit">Submit</button>
    </form>
  );
}

export default Common;
