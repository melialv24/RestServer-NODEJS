
const validarArchivos = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).send('No hay archivos por subir.');
    }

    next()
}

module.exports = {
    validarArchivos
}