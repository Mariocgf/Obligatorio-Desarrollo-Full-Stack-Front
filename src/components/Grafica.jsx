import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);
const Grafica = () => {
    const user = useSelector((state) => state.user.usuario);
    const data = [user.equipoSeguido?.estadisticasGenerales?.derrotas, user.equipoSeguido?.estadisticasGenerales?.victorias, user.equipoSeguido?.estadisticasGenerales?.empates];
    
    const aux = {
        
        labels: ['Partidos perdidos', 'Partidos ganados', 'Empates'],
        datasets: [
            {
                label: 'Estadísticas de equipo',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return <Doughnut data={aux} />;
};

export default Grafica;

