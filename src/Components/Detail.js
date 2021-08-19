import { Component } from 'react';
import { getScientist, getSpecialties, putScientist, getIdByName } from '../fetch-utils';
import classNames from 'classnames';

class Detail extends Component {

    state = {
        scientist: {},
        specialties: [],
        message: ''
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        const specialties = await getSpecialties();
        const scientist = await getScientist(id);
        const specialtyId = await getIdByName(specialties, scientist.specialty);
        this.setState({ 
            specialties,
            scientist: {...scientist, specialty: specialtyId}
         })
    }

    handleChange(e, key) {
        this.setState({
            scientist: {...this.state.scientist, [key]: e.target.value }
        })
    }

    async handleSubmitChanges(e) {
        e.preventDefault();
        const scientist = this.state.scientist;
        const result = await putScientist(scientist.id, {
            name: scientist.name,
            specialties_id: scientist.specialty,
            living: scientist.living,
            img_url: scientist.img_url
        });
        if (result.e) {
            this.setState({ message: result.e });
        } else {
            this.setState({ message: 'Scientist updated successfully'})
        }
        setTimeout(() => {
            this.setState({ message: '' })
            }, 3000);
    }

    render() {
        const { scientist, specialties, message } = this.state;
        return(
            <div className='update-scientist'>
                {message &&
                    <div 
                        className={classNames({
                            message: true,
                            'success': message === 'Scientist updated successfully',
                            'is-error': message !== 'Scientist updated successfully'
                        })}
                    >
                    {this.state.message}
                    </div>
                }
                <div className='scientist-form'>
                    {scientist.id &&
                    <form onSubmit={(e) => this.handleSubmitChanges(e)}>
                        <label htmlFor='name'>Name: </label>
                        <input 
                            name='name' 
                            value={scientist.name} 
                            onChange={(e) => this.handleChange(e, 'name')}
                        />
                        <label htmlFor='image-url'>Image url</label>
                        <input
                            name='img_url'
                            value={scientist.img_url}
                            onChange={(e) => this.handleChange(e, 'img_url')}
                        />
                        <label htmlFor='specialty'>Specialty: </label>
                        <select  
                            value={scientist.specialty}
                            name='specialty' 
                            onChange={(e) => this.handleChange(e, 'specialty')}
                            >
                            {specialties.map(specialty => {
                                return <option
                                            key={specialty.id} 
                                            value={specialty.id}
                                        >
                                        {specialty.name}
                                        </option>
                            })}
                        </select>
                        <label htmlFor='living'>Living: </label>
                        <select 
                            name='living' 
                            value={scientist.living} 
                            onChange={(e) => this.handleChange(e, 'living')}>
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                        </select>
                        <button type='submit' >Submit Changes</button>
                    </form>}
                </div>
            </div>
        )
    }
}

export default Detail;