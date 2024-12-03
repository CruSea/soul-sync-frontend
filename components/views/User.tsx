import Header from '@/components/shared/Header'
import Main from '@/components/shared/Main'

const UserView = () => {
  return (
    <div className="flex flex-col w-full h-screen">
      <Header page="user" />
      <Main page="user"/>
    </div>
  )
}

export default UserView