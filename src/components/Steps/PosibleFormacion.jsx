import img from "../../../assets/javi.jpg"
import { CardLayout } from "../../layout/CardLayout"

export const PosibleFormacion = () => {
  return (
    <CardLayout>
    <div className="flex flex-col ">
        <div className="flex justify-center">
            <h1 className="font-bold">Próximamente</h1>
        </div>

        <div className="flex justify-center ">
            <img src={img} alt="img" />
        </div>

    </div>
    </CardLayout>
  )
}
