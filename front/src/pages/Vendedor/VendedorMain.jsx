import { useState, useEffect } from "react"
import VentasVendedor from "./VentasVendedor";
import Header from "../../components/Header";
import NavbarIcon from "../../components/NavbarIcon";
import Profile from "../../components/Profile";
import TicketModal from "./TicketModal";

import sell from '/assets/sell.png'

let rol = "VENDEDOR";

function VendedorMain() {
    const [activeScreenVendedor, setActiveScreenVendedor] = useState("ventasVendedor");
    const [ventaModal, setVentaModal] = useState(false);
    const [refreshTickets, setRefreshTickets] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("usuario");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleTicketCreated = () => {
        setVentaModal(false); 
        setRefreshTickets(prev => !prev); 
    };

    const renderScreen = () => {
        switch (activeScreenVendedor) {
            case "ventasVendedor":
                return (
                    <VentasVendedor
                        ventaModal={ventaModal}
                        setVentaModal={setVentaModal}
                        refreshTickets={refreshTickets} 
                    />
                );
            default:
                return <h2>Pantalla no encontrada</h2>;
        }
    }

    return (
        <>
           
            {ventaModal && user && (
                <TicketModal
                    onClose={() => setVentaModal(false)}
                    onTicketCreated={handleTicketCreated} 
                />
            )}

            <div className="w-screen h-screen flex flex-col items-center">
                <Header rol={rol} />
                <hr className="w-[95%]" />
                <div className="w-full h-[90%] flex">
                <div className="w-[25%] h-full">
                    <div className="w-full h-[80%] flex flex-col items-center pt-[8vh]">
                        <NavbarIcon
                            icon={sell}
                            text={"Ventas"}
                            onClick={() => setActiveScreenVendedor("ventasVendedor")}
                            selected={activeScreenVendedor === "ventasVendedor"}
                        />
                    </div>
                    <div className="w-full h-[20%]">
                    <Profile />
                    </div>
                </div>
                {renderScreen()}
                </div>
            </div>
        </>
    )
}

export default VendedorMain;
