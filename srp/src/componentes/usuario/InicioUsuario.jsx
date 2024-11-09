import Header from "../utilizavel/Header";

export default function InicioUsuario() {
    
    return(

        <div className="container">

            <Header which="usuario" page="inicio" />

            <div className="cover">
                <h1>Discover what's out there.</h1>
                <span>
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </span>
                <form  className="flex-form">
                    <label for="from">
                        <i className="ion-location"></i>
                    </label>
                    <input type="search" placeholder="Where do you want to go?"/>
                    <input type="submit" value="Search"/>
                </form>
            </div>

        </div>

    )

}