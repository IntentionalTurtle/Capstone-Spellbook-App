import Input from "./Input"
import { useForm } from 'react-hook-form'
import { book_server_calls } from '../api/book_server';
import { server_calls2 } from "../api/dndserver";
import { useDispatch, useStore } from "react-redux";
import { chooseSpellID, chooseSpellURL, chooseSpellName, chooseSpellLevel, chooseSpellCastingTime, chooseSpellDuration, chooseSpellClasses} from "../redux/slices/SpellSlices"
import uuid from 'react-uuid';

interface EditFormProps {
  id: string
}

const SpellEditForm = ( props: EditFormProps) => {
  const { register, handleSubmit } = useForm({})
  const dispatch = useDispatch();
  const store = useStore();
  async function getURL(id = props.id) {
    const info = await server_calls2.get('/api/spells/' + id)
    return info.url
  }
 

  const onSubmit = (data: any) => {
    console.log(`ID: ${typeof props.id}`);
    console.log(props.id)
    console.log(data)
    async function settingValues() {
      data.id = uuid()
      data.url = getURL()
    }
    async function sendData() {
      await settingValues()
      book_server_calls.update(props.id, data)
    }
    if (props.id && props.id.length > 0) {
      console.log(data)
      sendData()      
      console.log(`Updated: ${ data.name } ${ data.id }`)
      setTimeout(() => {window.location.reload()}, 500)
    } else {
      dispatch(chooseSpellID(data.id));
      dispatch(chooseSpellURL(data.url));
      dispatch(chooseSpellName(data.name));
      dispatch(chooseSpellLevel(data.level));
      dispatch(chooseSpellCastingTime(data.casting_time));
      dispatch(chooseSpellDuration(data.duration));
      dispatch(chooseSpellClasses(data.classes));
//dispatch from redux - in order to do an action on the store - this slices the address, name, email, or phone # in order to change the data in the store
      book_server_calls.create(store.getState())
      setTimeout(() => {window.location.reload()}, 500)
    }
  }
 //register comes from react-hook-form and is used to validate the data - register sends from store to database
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Custom Spell Name</label>
          <Input {...register('name')} name='name' placeholder="Name" />
        </div>
        <div>
          <label htmlFor="level">Level</label>
          <Input {...register('level')} name='level' placeholder="Level " />
        </div>
        <div>
          <label htmlFor="casting_time">Casting Time</label>
          <Input {...register('casting_time')} name='casting_time' placeholder="Casting Time" />
        </div>
        <div>
          <label htmlFor="duration">Duration</label>
          <Input {...register('duration')} name='duration' placeholder="Duration" />
        </div>
        <div>
          <label htmlFor="classes">Classes</label>
          <Input {...register('classes')} name='classes' placeholder="Classes" />
        </div>
        <div className="flex p-1">
          <input type="submit" 
          />
        </div>
      </form>
    </div>
  )
}

export default SpellEditForm