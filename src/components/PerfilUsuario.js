import React, { useState } from 'react';
import styles from '../styles/PerfilUsuario.module.css'; // Import CSS Module
import PerfilImagen from '../assets/Perfil.png'; // ¡IMPORTA TU IMAGEN AQUÍ! Asegúrate de que la ruta sea correcta.

function PerfilUsuario() {
    // --- Estados para la información personal (editables) ---
    const [nombreCompleto, setNombreCompleto] = useState('Maria Rodriguez');
    const [correoElectronico, setCorreoElectronico] = useState('maria.rodriguez@example.com');
    const [numeroTelefono, setNumeroTelefono] = useState('+1 (555) 123-4567');
    const [fechaNacimiento, setFechaNacimiento] = useState('1985-12-05'); // Formato YYYY-MM-DD para input date
    const [fotoPerfilUrl, setFotoPerfilUrl] = useState(PerfilImagen); // ¡USA LA IMAGEN IMPORTADA AQUÍ!

    // ... el resto de tu código sigue igual ...

    // --- Estados para la información de salud (editables) ---
    const [altura, setAltura] = useState("5'6\"");
    const [peso, setPeso] = useState('145 lbs');
    const [condicionesMedicas, setCondicionesMedicas] = useState('Anxiety, Mild depression');
    const [medicamentosActuales, setMedicamentosActuales] = useState('Sertraline 50mg daily');

    // --- Estados para la configuración de notificaciones (alternadores) ---
    const [notificacionesEmail, setNotificacionesEmail] = useState(true);
    const [notificacionesSms, setNotificacionesSms] = useState(false); // Ejemplo, puede ser true/false
    const [notificacionesApp, setNotificacionesApp] = useState(true);

    // --- Estado para controlar el modo de edición ---
    const [modoEdicion, setModoEdicion] = useState(false);

    // --- Estado para el modal de administración de privacidad (simulado) ---
    const [modalPrivacidadAbierto, setModalPrivacidadAbierto] = useState(false);

    // --- Almacenar el estado original para la función de cancelar ---
    const [datosOriginales, setDatosOriginales] = useState({
        nombreCompleto,
        correoElectronico,
        numeroTelefono,
        fechaNacimiento,
        altura,
        peso,
        condicionesMedicas,
        medicamentosActuales,
        notificacionesEmail,
        notificacionesSms,
        notificacionesApp,
        fotoPerfilUrl, // Incluimos la URL de la foto en el estado original
    });

    // Función para manejar la edición
    const handleEditar = () => {
        // Guardar el estado actual como "original" al entrar en modo edición
        setDatosOriginales({
            nombreCompleto,
            correoElectronico,
            numeroTelefono,
            fechaNacimiento,
            altura,
            peso,
            condicionesMedicas,
            medicamentosActuales,
            notificacionesEmail,
            notificacionesSms,
            notificacionesApp,
            fotoPerfilUrl,
        });
        setModoEdicion(true);
    };

    // Función para guardar los cambios
    const handleGuardarCambios = () => {
        // Aquí se simularía el envío de los datos actualizados a un backend
        console.log('Guardando cambios:', {
            nombreCompleto,
            correoElectronico,
            numeroTelefono,
            fechaNacimiento,
            altura,
            peso,
            condicionesMedicas,
            medicamentosActuales,
            notificacionesEmail,
            notificacionesSms,
            notificacionesApp,
            fotoPerfilUrl,
        });
        alert('¡Cambios guardados con éxito!');
        setModoEdicion(false); // Salir del modo edición
    };

    // Función para cancelar la edición
    const handleCancelar = () => {
        // Restaurar los datos a su estado original
        setNombreCompleto(datosOriginales.nombreCompleto);
        setCorreoElectronico(datosOriginales.correoElectronico);
        setNumeroTelefono(datosOriginales.numeroTelefono);
        setFechaNacimiento(datosOriginales.fechaNacimiento);
        setAltura(datosOriginales.altura);
        setPeso(datosOriginales.peso);
        setCondicionesMedicas(datosOriginales.condicionesMedicas);
        setMedicamentosActuales(datosOriginales.medicamentosActuales);
        setNotificacionesEmail(datosOriginales.notificacionesEmail);
        setNotificacionesSms(datosOriginales.notificacionesSms);
        setNotificacionesApp(datosOriginales.notificacionesApp);
        setFotoPerfilUrl(datosOriginales.fotoPerfilUrl);

        alert('Edición cancelada. Los cambios no se guardaron.');
        setModoEdicion(false); // Salir del modo edición
    };

    // Función para cambiar la foto (simulada)
    const handleChangePhoto = () => {
        // Aquí podrías implementar una lógica más avanzada para subir una imagen,
        // pero por ahora, mantendremos el prompt o podríamos predefinir una imagen de ejemplo.
        const newPhotoUrl = prompt('Ingresa la URL de la nueva foto de perfil (o deja vacío para usar la predeterminada):');
        if (newPhotoUrl) {
            setFotoPerfilUrl(newPhotoUrl);
            alert('Foto de perfil actualizada (simulado).');
        } else {
            // Si el usuario cancela o deja vacío, puedes volver a la imagen predeterminada si lo deseas.
            setFotoPerfilUrl(PerfilImagen);
            alert('Foto de perfil restaurada a la predeterminada.');
        }
    };


    // Función para administrar la privacidad (simulado con un modal simple)
    const handleAdministrarPrivacidad = () => {
        setModalPrivacidadAbierto(true);
    };

    const cerrarModalPrivacidad = () => {
        setModalPrivacidadAbierto(false);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Información personal</h2>

            {/* Botón de Editar/Guardar/Cancelar */}
            <div className={styles.topActions}>
                {!modoEdicion ? (
                    <button className={styles.editButton} onClick={handleEditar}>
                        Editar Perfil
                    </button>
                ) : (
                    <div className={styles.editModeButtons}>
                        <button className={styles.saveButton} onClick={handleGuardarCambios}>
                            Guardar cambios
                        </button>
                        <button className={styles.cancelButton} onClick={handleCancelar}>
                            Cancelar
                        </button>
                    </div>
                )}
            </div>

            <div className={styles.section}>
                <div className={styles.header}>
                    <div className={styles.icon}>👤</div>
                    <h3>Detalles del perfil</h3>
                </div>
                <p className={styles.subtitle}>Actualiza tu información personal y foto de perfil</p>

                <div className={styles.profileImageContainer}>
                    <img
                        src={fotoPerfilUrl}
                        alt="Foto de perfil"
                        className={styles.profileImage}
                    />
                    {modoEdicion && ( // Solo muestra el botón "Cambiar foto" en modo edición
                        <button className={styles.changePhotoButton} onClick={handleChangePhoto}>
                            Cambiar foto
                        </button>
                    )}
                </div>

                <div className={styles.infoItem}>
                    <label className={styles.label}>Nombre completo</label>
                    {modoEdicion ? (
                        <input
                            type="text"
                            className={styles.inputField}
                            value={nombreCompleto}
                            onChange={(e) => setNombreCompleto(e.target.value)}
                        />
                    ) : (
                        <div className={styles.value}>{nombreCompleto}</div>
                    )}
                </div>

                <div className={styles.infoItem}>
                    <label className={styles.label}>Correo electrónico</label>
                    {modoEdicion ? (
                        <input
                            type="email"
                            className={styles.inputField}
                            value={correoElectronico}
                            onChange={(e) => setCorreoElectronico(e.target.value)}
                        />
                    ) : (
                        <div className={styles.value}>
                            {correoElectronico}
                            <span className={styles.icon}>✉️</span>
                        </div>
                    )}
                </div>

                <div className={styles.infoItem}>
                    <label className={styles.label}>Número de teléfono</label>
                    {modoEdicion ? (
                        <input
                            type="tel" // Usar 'tel' para números de teléfono
                            className={styles.inputField}
                            value={numeroTelefono}
                            onChange={(e) => setNumeroTelefono(e.target.value)}
                        />
                    ) : (
                        <div className={styles.value}>
                            {numeroTelefono}
                            <span className={styles.icon}>📞</span>
                        </div>
                    )}
                </div>

                <div className={styles.infoItem}>
                    <label className={styles.label}>Fecha de nacimiento</label>
                    {modoEdicion ? (
                        <input
                            type="date"
                            className={styles.inputField}
                            value={fechaNacimiento}
                            onChange={(e) => setFechaNacimiento(e.target.value)}
                        />
                    ) : (
                        <div className={styles.value}>
                            {new Date(fechaNacimiento).toLocaleDateString('es-ES')} {/* Formatear para visualización */}
                            <span className={styles.icon}>📅</span>
                        </div>
                    )}
                </div>
            </div>

            <h2 className={styles.title}>Información de salud</h2>

            <div className={styles.section}>
                <div className={styles.header}>
                    <div className={styles.icon}>⚕️</div>
                    <h3>Detalles médicos</h3>
                </div>
                <p className={styles.subtitle}>Esta información nos ayuda a personalizar sus recomendaciones de salud mental.</p>

                <div className={styles.infoItem}>
                    <label className={styles.label}>Altura</label>
                    {modoEdicion ? (
                        <input
                            type="text"
                            className={styles.inputField}
                            value={altura}
                            onChange={(e) => setAltura(e.target.value)}
                            placeholder={`Ej. 5'6" o 168 cm`}
                        />
                    ) : (
                        <div className={styles.value}>{altura}</div>
                    )}
                </div>

                <div className={styles.infoItem}>
                    <label className={styles.label}>Peso</label>
                    {modoEdicion ? (
                        <input
                            type="text"
                            className={styles.inputField}
                            value={peso}
                            onChange={(e) => setPeso(e.target.value)}
                            placeholder="Ej. 145 lbs o 65 kg"
                        />
                    ) : (
                        <div className={styles.value}>{peso}</div>
                    )}
                </div>

                <div className={styles.infoItem}>
                    <label className={styles.label}>Condiciones médicas</label>
                    {modoEdicion ? (
                        <textarea
                            className={styles.inputField}
                            value={condicionesMedicas}
                            onChange={(e) => setCondicionesMedicas(e.target.value)}
                            rows="2"
                            placeholder="Ej. Ansiedad, Depresión leve"
                        ></textarea>
                    ) : (
                        <div className={styles.value}>{condicionesMedicas}</div>
                    )}
                </div>

                <div className={styles.infoItem}>
                    <label className={styles.label}>Medicamentos actuales</label>
                    {modoEdicion ? (
                        <textarea
                            className={styles.inputField}
                            value={medicamentosActuales}
                            onChange={(e) => setMedicamentosActuales(e.target.value)}
                            rows="2"
                            placeholder="Ej. Sertralina 50mg diaria"
                        ></textarea>
                    ) : (
                        <div className={styles.value}>{medicamentosActuales}</div>
                    )}
                </div>
            </div>

            <h2 className={styles.title}>Preferencias de la cuenta</h2>

            <div className={styles.section}>
                <div className={styles.header}>
                    <div className={styles.icon}>🔔</div>
                    <h3>Configuración de notificaciones</h3>
                </div>
                <p className={styles.subtitle}>Administra cómo y cuándo recibes notificaciones</p>

                <div className={styles.notificationItem}>
                    <div className={styles.notificationLabel}>
                        <span className={styles.notificationIcon}>✉️</span>
                        <span>Notificaciones por correo electrónico</span>
                    </div>
                    <span className={styles.notificationDescription}>Recibe actualizaciones y recordatorios por correo electrónico</span>
                    <label className={styles.switch}>
                        <input
                            type="checkbox"
                            checked={notificacionesEmail}
                            onChange={(e) => setNotificacionesEmail(e.target.checked)}
                            disabled={!modoEdicion} // Deshabilitar si no está en modo edición
                        />
                        <span className={styles.slider}></span>
                    </label>
                </div>

                <div className={styles.notificationItem}>
                    <div className={styles.notificationLabel}>
                        <span className={styles.notificationIcon}>💬</span>
                        <span>Notificaciones SMS</span>
                    </div>
                    <span className={styles.notificationDescription}>Recibe mensajes de texto para alertas importantes</span>
                    <label className={styles.switch}>
                        <input
                            type="checkbox"
                            checked={notificacionesSms}
                            onChange={(e) => setNotificacionesSms(e.target.checked)}
                            disabled={!modoEdicion}
                        />
                        <span className={styles.slider}></span>
                    </label>
                </div>

                <div className={styles.notificationItem}>
                    <div className={styles.notificationLabel}>
                        <span className={styles.notificationIcon}>📱</span>
                        <span>Notificaciones de la aplicación</span>
                    </div>
                    <span className={styles.notificationDescription}>Recibe notificaciones push en tu dispositivo</span>
                    <label className={styles.switch}>
                        <input
                            type="checkbox"
                            checked={notificacionesApp}
                            onChange={(e) => setNotificacionesApp(e.target.checked)}
                            disabled={!modoEdicion}
                        />
                        <span className={styles.slider}></span>
                    </label>
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.header}>
                    <div className={styles.icon}>🔒</div>
                    <h3>Configuración de privacidad</h3>
                </div>
                <p className={styles.subtitle}>Controla cómo se utilizan y comparten tus datos</p>
                <button
                    className={styles.privacyButton}
                    onClick={handleAdministrarPrivacidad}
                    disabled={!modoEdicion} // Deshabilitar si no está en modo edición
                >
                    Administrar la privacidad
                </button>
            </div>

            {/* Los botones de guardar/cancelar se movieron arriba para mayor consistencia,
                pero los mantenemos aquí si se prefieren al final */}
            {modoEdicion && (
                <div className={styles.actions}>
                    <button className={styles.saveButton} onClick={handleGuardarCambios}>
                        Guardar cambios
                    </button>
                    <button className={styles.cancelButton} onClick={handleCancelar}>
                        Cancelar
                    </button>
                </div>
            )}

            {/* Modal de Privacidad (simulado) */}
            {modalPrivacidadAbierto && (
                <div className={styles.modalOverlay} onClick={cerrarModalPrivacidad}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={cerrarModalPrivacidad}>×</button>
                        <h2 className={styles.modalTitle}>Administrar Configuración de Privacidad</h2>
                        <div className={styles.modalBody}>
                            <p>Aquí puedes controlar cómo se utilizan y comparten tus datos.</p>
                            <h4>Opciones de Datos:</h4>
                            <ul>
                                <li>Consentimiento para el uso de datos anonimizados para investigación:
                                    <label className={styles.switch}>
                                        <input type="checkbox" defaultChecked={true} />
                                        <span className={styles.slider}></span>
                                    </label>
                                </li>
                                <li>Compartir datos de bienestar con tu médico:
                                    <label className={styles.switch}>
                                        <input type="checkbox" defaultChecked={false} />
                                        <span className={styles.slider}></span>
                                    </label>
                                </li>
                            </ul>
                            <h4>Eliminar Cuenta:</h4>
                            <p>Si deseas eliminar tu cuenta y todos tus datos, por favor, contacta a soporte.</p>
                            <button className={styles.modalButton} onClick={cerrarModalPrivacidad}>Cerrar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PerfilUsuario;