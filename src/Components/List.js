import { Component } from 'react';
import { getScientists, deleteScientist } from '../fetch-utils';
import { Link } from 'react-router-dom';


class List extends Component {

    state = { data: [] };

    async componentDidMount() {
        const data = await getScientists();
        this.setState({ data })
    }

    async handleDeleteScientist(id) {
        const result = await deleteScientist(id);
        if (result.e) {
            console.log('Failed to delete: ' + result.e)
        }
        const data = await getScientists();
        this.setState({ data });
    }

    render() {
        return (
            <div className='list-container'>
                {this.state.data.map(scientist => {
                    return (
                    <div className="scientist-link-item" key={scientist.id}>
                        <Link to={`/scientists/${scientist.id}`}>{scientist.name}</Link>
                        <img className='scientist-mug' src={scientist.img_url} alt={scientist.name} />
                        <button onClick={() => this.handleDeleteScientist(scientist.id)}>DELETE</button>
                    </div>
                    )
                })}
            </div>
        )
    }
}

export default List;