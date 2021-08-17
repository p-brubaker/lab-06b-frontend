import { Component } from 'react';
import { getScientists } from '../fetch-utils';

class List extends Component {

    state = { data: [] };

    async componentDidMount() {
        const data = await getScientists();
        this.setState({ data })
    }

    render() {
        return (
            <h1>List</h1>
        )
    }
}

export default List;