import Input from "../Input"
import { useForm } from 'react-hook-form'
import { feature_book_server_calls } from '../../api/book_server';
import { server_calls2 } from "../../api/dndspellserver";
import { useDispatch, useStore } from "react-redux";
import { chooseID, chooseURL, chooseName, chooseLevel, chooseClasses, chooseDescription} from "../../redux/slices/Slices"
import uuid from 'react-uuid';
import { useEffect } from "react";

interface EditFormProps {
  id: string
}

const FeatureEditForm = ( props: EditFormProps) => {
  const { register, handleSubmit } = useForm({})
  const dispatch = useDispatch();
  const store = useStore();
  async function getURL(id = props.id) {
    const info = await server_calls2.get('/api/features/' + id)
    return info.url
  }
  useEffect( () => {
  })
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
      feature_book_server_calls.update(props.id, data)
    }
    if (props.id && props.id.length > 0) {
      console.log(data)
      sendData()      
      console.log(`Updated: ${ data.name } ${ data.id }`)
      setTimeout(() => {window.location.reload()}, 500)
    } else {
      dispatch(chooseID(data.id));
      dispatch(chooseURL(data.url));
      dispatch(chooseName(data.name));
      dispatch(chooseLevel(data.level));
      dispatch(chooseClasses(data.classes));
      dispatch(chooseDescription(data.desc));
//dispatch from redux - in order to do an action on the store - this slices the address, name, email, or phone # in order to change the data in the store
      feature_book_server_calls.create(store.getState())
      setTimeout(() => {window.location.reload()}, 500)
    }
  }
 //register comes from react-hook-form and is used to validate the data - register sends from store to database
  return (
    <div className="overflow-y-scroll">
      <form onSubmit={handleSubmit(onSubmit)} >
        <div>
          <label htmlFor="name">Custom Spell Name</label>
          <Input {...register('name')} name='name' placeholder="Name" />
        </div>
        <div>
          <label htmlFor="level">Level</label>
          <Input {...register('level')} name='level' placeholder="Level " />
        </div>
        <div>
          <label htmlFor="classes">Classes</label>
          <Input {...register('classes')} name='classes' placeholder="Classes" />
        </div>
        <div>
          <label htmlFor="desc">Feature Description</label>
          <Input {...register('desc')} name='desc' placeholder="Custom Description" />
        </div>
        <div className="flex p-1">
          <input type="submit" 
          />
        </div>
      </form>
    </div>
  )
}

export default FeatureEditForm