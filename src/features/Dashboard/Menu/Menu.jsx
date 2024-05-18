import NameForm from '../NameForm';
import StartTimerButton from './StartTimerButton'
import PauseResumeButton from './PauseResumeButton'

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

            <div>
                <StartTimerButton/> <br/>
                <PauseResumeButton/>
            </div>
        </>
    )
};

export default Menu;
