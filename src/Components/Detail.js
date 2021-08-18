import { Component } from 'react';
import { getScientist, getSpecialties, getIdByName, putScientist } from '../fetch-utils';

class Detail extends Component {

    state = {}

    async componentDidMount() {
        const id = this.props.match.params.id;
        const data = await getScientist(id);
        this.setState(data)
    }

    handleChange(e, key) {
        console.log(this.state);
        this.setState({
            ...this.state,
            [key]: e.target.value
        } )
    }

    async handleSubmitChanges(e) {
        e.preventDefault();
        console.log(this.state);
        const specialties = await getSpecialties();
        const specialtyId = await getIdByName(specialties, this.state.specialty);
        const result = await putScientist(this.state.id, {
            name: this.state.name,
            living: this.state.living,
            specialties_id: specialtyId
        })
        console.log(result);
        return result;
    }

    render() {
        const scientist = this.state;
        return(
            <div className='scientist-form'>
                <form onSubmit={(e) => this.handleSubmitChanges(e)}>
                    <label htmlFor='name'>Name: {scientist.name}</label>
                    <input name='name' onChange={(e) => this.handleChange(e, 'name')}/>
                    <label htmlFor='specialty'>Specialty: {scientist.specialty}</label>
                    <select name='specialty' onChange={(e) => this.handleChange(e, 'specialty')}>
                        <option value='cryptography'>Cryptography</option>
                        <option value='logic'>Logic</option>
                        <option value='hardware design'>Hardware Design</option>
                        <option value='open source'>Open Source</option>
                    </select>
                    <label htmlFor='living'>Living: {scientist.living ? 'True' : 'False'}</label>
                    <select name='living' onChange={(e) => this.handleChange(e, 'living')}>
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                    </select>
                    <button type='submit' >Submit Changes</button>
                </form>
            </div>
        )
    }
}

export default Detail;