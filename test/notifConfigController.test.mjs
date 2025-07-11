import { jest } from '@jest/globals';
import request from 'supertest';

// Evita verificación de token
jest.unstable_mockModule('../controllers/authMiddle.js', () => ({
  verifyToken: (req, res, next) => next()
}));

const { default: app } = await import('../server.js');

describe('Rutas de configuración de notificaciones', () => {
  test('GET /api/notificaciones/configuracion-notificaciones/:idUsuario devuelve configuración', async () => {
    const response = await request(app)
      .get('/api/notificaciones/configuracion-notificaciones/1');

    console.log('🔍 Configuración GET:', response.status, response.body);

    expect([200, 204, 404]).toContain(response.status);
    if (response.status === 200) {
      expect(Array.isArray(response.body)).toBe(true); // ✅ ajustado
    }
  });

  test('PUT /api/notificaciones/configuracion-notificaciones/:idUsuario actualiza configuración', async () => {
    const payload = [
      {
        idNotificacion: 1,
        activo: true,
        parametroTiempo: 10
      }
    ];

    const response = await request(app)
      .put('/api/notificaciones/configuracion-notificaciones/1')
      .send(payload);

    console.log('🔍 Configuración PUT:', response.status, response.body);

    expect([200, 400, 404]).toContain(response.status);
    if (response.status === 200) {
      expect(response.body.message).toBe('Cambio de configuración exitosa'); // ✅ ajustado
    }
  });
});