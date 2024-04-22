import NameForm from '../NameForm';

const Menu = ({users, addUser, removeUser}) => {

    return (
        <>
            <div>
                <NameForm addUser={addUser} removeUser={removeUser} />
            </div>
            <div>
                <span>Queue of users</span>
                <ul>
                    {users.map((user, index) => (
                        <li key={index}>
                            {user.name}{user.lastname}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
};

export default Menu;
