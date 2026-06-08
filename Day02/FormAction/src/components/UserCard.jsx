function UserCard({ user }) {
  return (
    <>
      <h2>{user.name}</h2>
      <p>{user.role}</p>
    </>
  );
}

export default UserCard;
