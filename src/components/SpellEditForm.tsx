import { Button} from '@mui/material';
import Input from "./Input"

import { useForm } from 'react-hook-form'
import { book_server_calls } from '../api/book_server';
import { useDispatch, useStore } from "react-redux"
import { chooseSpellID, chooseSpellName, chooseSpellLevel, chooseSpellCastingTime, chooseSpellDuration, chooseSpellClasses} from "../redux/slices/SpellSlices"

interface EditFormProps {
  id?: string[]
}

const SpellEditForm = ( props: EditFormProps) => {
  const { register, handleSubmit } = useForm({})
  const dispatch = useDispatch();
  const store = useStore();



  const onSubmit = (data: any) => {
    console.log(`ID: ${typeof props.id}`);
    console.log(props.id)
    console.log(data)
    if (props.id && props.id.length > 0) {
      book_server_calls.update(props.id[0], data)
      console.log(`Updated: ${ data.first } ${ props.id }`)
      setTimeout(() => {window.location.reload()}, 500)
    } else {
      dispatch(chooseSpellID(data.id));
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
          <label htmlFor="name">Contact Name</label>
          <Input {...register('name')} name='name' placeholder="Name" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Input {...register('email')} name='email' placeholder="Email" />
        </div>
        <div>
          <label htmlFor="phone_number">Phone Number</label>
          <Input {...register('phone_number')} name='phone_number' placeholder="Phone Number" />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <Input {...register('address')} name='address' placeholder="Address" />
        </div>
        <div>
          <label htmlFor="name">Contact Name</label>
          <Input {...register('name')} name='name' placeholder="Name" />
        </div>
        <div className="flex p-1">
          <Button className="flex justify-start m-3 bg-slate-300 p-2 rounded hover:bg-slate-800 text-white"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SpellEditForm