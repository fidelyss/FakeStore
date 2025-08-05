import { Button } from './Components/button'
import { Card } from './Components/card'
function App() {
  return (
    <>
      <Button size='sm' >comprar</Button>
      <Card variant="primary" size="lg">
        <h2 className="text-xl font-bold mb-2">Título do Card</h2>
        <p className="text-sm">Este é um card estilizado com Tailwind Variants!</p>
        <Button variant="danger" size="sm">Ação</Button>
      </Card>
    </>
  )
}

export default App
