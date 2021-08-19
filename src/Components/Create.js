import { Component } from 'react';
import { getSpecialties, postScientist } from '../fetch-utils';
import classNames from 'classnames';

class Create extends Component {

    state = {
        specialties: [],
        scientist: {},
        message: ''
    }

    async componentDidMount() {
        const specialties = await getSpecialties();
        this.setState({ specialties })
    }

    handleChange(e, key) {
        this.setState({
            scientist: { ...this.state.scientist, [key]: e.target.value }
        } )
    }

    async handleSubmitChanges(e) {
        const scientist = this.state.scientist;
        e.preventDefault();
        const result = await postScientist({
            name: scientist.name,
            specialties_id: scientist.specialty || 1,
            living: scientist.living || true,
            img_url: scientist.img_url || ''
        });
        if (result.e) {
            this.setState({ message: result.e });
        } else {
            this.setState({ message: 'Scientist created successfully'})
        }
        setTimeout(() => {
            this.setState({ message: '' })
            }, 2000);
    }

    render() {
        const { scientist, specialties, message } = this.state;
        return(
            <div className = 'create-scientist'>
                {message &&
                    <div 
                        className={classNames({
                            'message': true,
                            'is-error': this.state.message !== 'Scientist created successfully',
                            'success':  this.state.message === 'Scientist created successfully'
                        })}
                    >{message}</div>
                }
                <div className='scientist-form'>
                    <form onSubmit={(e) => this.handleSubmitChanges(e)}>
                        <label htmlFor='name'>Name: </label>
                        <input 
                            required
                            name='name' 
                            value={scientist.name || ''}
                            onChange={(e) => this.handleChange(e, 'name')}
                        />
                        <label htmlFor='image-url'>Image url</label>
                        <input
                            required
                            name='img_url'
                            value={scientist.img_url || ''}
                            onChange={(e) => this.handleChange(e, 'img_url')}
                        />
                        <label htmlFor='specialty'>Specialty: </label>
                        <select 
                            value={scientist.specialty} 
                            name='specialty' 
                            onChange={(e) => this.handleChange(e, 'specialty')}>
                            {specialties.map(specialty => {
                                return <option
                                            key={specialty.id} 
                                            value={specialty.id}>{specialty.name}
                                        </option>
                            })}
                        </select>
                        <label htmlFor='living'>Living: </label>
                        <select 
                            name='living' 
                            value={scientist.living || true} 
                            onChange={(e) => this.handleChange(e, 'living')}>
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                        </select>
                        <button type='submit' >Submit Changes</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Create;