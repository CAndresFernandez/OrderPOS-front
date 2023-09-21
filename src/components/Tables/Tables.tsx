import LoggedAs from '../LoggedAs/LoggedAs';
import Table from '../Table/Table';
import './Tables.scss';

function Tables() {
    return (
        <>
            <header>
                <LoggedAs />
                <h2>Tables</h2>
            </header>
            <ul>
                <li><Table /></li>
                <li><Table /></li>
                <li><Table /></li>
                <li><Table /></li>
                <li><Table /></li>
                <li><Table /></li>
                <li><Table /></li>
                <li><Table /></li>
                <li><Table /></li>
                <li><Table /></li>
            </ul>
        </>
    )
}

export default Tables;