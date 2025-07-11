import { useState, useEffect } from 'react'
import checkmark from '../assets/checkmark.png'


function ReportButton({ reporte }) {
    const [isSelected, setIsSelected] = useState(reporte.resuelto === true); 
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (isSelected && !reporte.resuelto) {
            fetch(`http://localhost:3001/reportes/${reporte.idReporte}`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ resuelto: true }),
            })
            .then(res => {
                if (!res.ok) throw new Error('Error al actualizar el reporte');
                return res.json();
            })
            .then(data => {
                console.log('Reporte actualizado:', data);
            })
            .catch(err => {
                console.error('Error al actualizar el reporte:', err);
                setIsSelected(false);
            });
        }
    }, [isSelected]);

    const handleClick = () => {
        if (!isSelected) {
            setIsSelected(true); 
        }
    };
    

    return (
        <button 
            data-testid="UpdateEstadoReport-button"
            className={`relative group w-[70%] h-[50%] ${isSelected ? 'bg-slate-100' : 'bg-black'} 
            rounded-2xl font-sans text-white text-center overflow-hidden hover:bg-slate-100 duration-500`}
            onClick={handleClick}
            >
            {!isSelected && (
                <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:-top-[200%]">
                    {isSelected ? null : <h1 className="text-white">Por resolver</h1>}
                </div>
            )}

            <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 
                ${isSelected ? 'top-0' : 'top-[200%] group-hover:top-0'}`}>
                <img src={checkmark} alt="" className={`$ w-[20%]`} />
            </div>
        </button>
    );
}

export default ReportButton;
