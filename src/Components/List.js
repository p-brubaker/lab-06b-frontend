import { Component } from 'react';
import { getScientists } from '../fetch-utils';
import { Link } from 'react-router-dom';

class List extends Component {

    state = { data: [] };

    async componentDidMount() {
        const data = await getScientists();
        this.setState({ data })
    }

    render() {
        return (
            this.state.data.map(scientist => {
                return (
                <div className="scientist-link-item" key={scientist.id}>
                    <Link to={`/scientists/${scientist.id}`}>{scientist.name}</Link>
                </div>
                )
            })
        )
    }
}

export default List;