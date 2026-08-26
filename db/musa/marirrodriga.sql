-- MUSA · Memoria de marca de MARIRRODRIGA I.A
--
-- Solo datos. El esquema es unico y portable y vive en el repositorio donde
-- esta documentado MUSA:
--   pedro-probioticos/db/musa-memoria/001-esquema-memoria.sql
-- Se aplica ese primero, y esto despues.
--
-- Idempotente a proposito: se puede volver a lanzar sin duplicar nada, porque
-- se va a lanzar mas de una vez mientras se afina.
--
-- ESTO LO ESCRIBE UNA PERSONA. Es la estrategia de la casa. Si algun dia un
-- modelo empieza a editar esta tabla, ya no hay departamento: hay un generador
-- de ruido con buena redaccion.
--
-- Fuentes de lo que hay aqui: SERVICIOS DE VENTA/01-agency-profile.md,
-- rrss-agency.md y la tesis de posicionamiento del ceo-status (14-08-2026).
-- No hay ni un dato inventado: lo que no estaba escrito, no esta.

begin;

-- ---------------------------------------------------------------------------
-- La marca
-- ---------------------------------------------------------------------------

insert into public.marcas (slug, nombre, notas)
values ('marirrodriga', 'Marirrodriga I.A',
        'La agencia. Primer inquilino de MUSA: se construye y se prueba aqui, donde equivocarse no le cuesta nada a un cliente.')
on conflict (slug) do update set nombre = excluded.nombre;

-- ---------------------------------------------------------------------------
-- Plataforma
-- ---------------------------------------------------------------------------

update public.marca_plataforma set vigente = false
 where marca_id = (select id from public.marcas where slug = 'marirrodriga');

insert into public.marca_plataforma
  (marca_id, version, promesa, para_quien, no_para_quien, en_que_creemos,
   tono, tono_no, tratamiento, palabras_vetadas, escrita_por, notas)
select id, 1,
  'Automatizamos lo que te roba tiempo.',
  'Duenos de negocios locales espanoles donde el dueno es quien decide, con un dolor evidente en gestion de citas o atencion al cliente.',
  'Empresas con comite de compras y ciclos largos. Quien quiere "una IA" sin saber para que. Quien compara solo por precio.',
  array[
    'La IA no se compra, se implanta por fases. Se empieza por lo que mas tiempo roba y con lo que eso devuelve se paga el siguiente paso.',
    'Cada negocio sube hasta donde su sector le permite, y no pasa nada. El techo de un gimnasio de barrio no es el de una marca nacional.',
    'El precio sigue al entregable, no a la cartera. El descuento es proporcional a lo que dejas de construir, no al tamano del cliente.',
    'Un precio sin limite escrito es una mentira o una trampa.',
    'Lo que no se escribe, no ha pasado. Se documenta mientras se construye, nunca al final.'
  ],
  array['directo', 'concreto', 'con numeros', 'de oficio', 'honesto sobre los limites'],
  array['entusiasta', 'visionario', 'epico', 'misterioso', 'motivacional'],
  'tu',
  array[
    'revolucionario', 'disruptivo', 'potenciar', 'sinergia', 'ecosistema',
    'empoderar', 'transformacion digital', 'el futuro es ahora',
    'lleva tu negocio al siguiente nivel', 'impulsa tu negocio', 'desbloquea',
    'descubre como', 'no te lo pierdas', 'en un mundo donde', 'la clave esta en',
    'soluciones a medida para tus necesidades'
  ],
  'Isma',
  'La lista de palabras vetadas no es teorica: sale del motivo por el que el correo frio esta parado desde el 20-08 (el copy salia generico y se notaba escrito por IA).'
from public.marcas where slug = 'marirrodriga';

-- ---------------------------------------------------------------------------
-- Audiencias
-- ---------------------------------------------------------------------------

delete from public.marca_audiencias
 where marca_id = (select id from public.marcas where slug = 'marirrodriga');

insert into public.marca_audiencias
  (marca_id, nombre, descripcion, le_preocupa, habla_asi, donde_esta, no_le_interesa)
select m.id, a.nombre, a.descripcion, a.le_preocupa, a.habla_asi, a.donde_esta, a.no_le_interesa
from public.marcas m, (values
  ('Dueno de clinica o negocio local',
   'Decide solo, cierra en dias, no tiene departamento de nada. Dentistas, fisios, esteticas, peluquerias, psicologos, autoescuelas.',
   array['que el telefono no pare y aun asi perder citas', 'no poder atender fuera de horario', 'depender de una persona que si se va se lleva el metodo', 'que le vendan humo caro'],
   array['el telefono no para', 'se me escapan pacientes', 'no doy abasto', 'lo llevo todo yo', 'ya probe una cosa de esas y no servia'],
   array['LinkedIn', 'grupos de sector', 'boca a boca'],
   array['la tecnologia por si misma', 'palabras en ingles', 'casos de empresas grandes']),

  ('Autonomo con tienda o servicio online',
   'Vende poco volumen pero constante. Contesta el mismo mensaje treinta veces al dia.',
   array['repetir la misma respuesta sin parar', 'perder ventas por tardar en contestar', 'no saber que le funciona'],
   array['contesto siempre lo mismo', 'me escriben a todas horas', 'no tengo tiempo de mirar los numeros'],
   array['LinkedIn', 'Instagram', 'foros de comercio electronico'],
   array['contratos largos', 'permanencias']),

  ('Marca en lanzamiento',
   'Producto por salir, sin equipo, montando la tienda, el CRM y las redes a la vez. Perfil tipo Pedro.',
   array['montarlo todo a la vez sin equipo', 'depender de plataformas de alquiler', 'que la web parezca de plantilla'],
   array['quiero algo propio', 'no quiero pagar comisiones a nadie', 'necesito salir ya'],
   array['LinkedIn', 'Instagram'],
   array['soluciones genericas', 'plantillas'])
) as a(nombre, descripcion, le_preocupa, habla_asi, donde_esta, no_le_interesa)
where m.slug = 'marirrodriga';

-- ---------------------------------------------------------------------------
-- Pilares
-- ---------------------------------------------------------------------------

-- El reparto por proposito sale en 55 / 35 / 10. Deliberadamente lejos del
-- 70/20/10 de manual, porque una agencia que ensena su oficio vende
-- ensenandolo: aqui "conversa" pesa mas que en una marca de producto.

delete from public.marca_pilares
 where marca_id = (select id from public.marcas where slug = 'marirrodriga');

insert into public.marca_pilares (marca_id, nombre, descripcion, proposito, cuota_objetivo, ejemplos)
select m.id, p.nombre, p.descripcion, p.proposito, p.cuota, p.ejemplos
from public.marcas m, (values
  ('Automatizaciones con nombre y numero',
   'Cosas que estan funcionando de verdad, con la cifra al lado: cuanto tarda, cuanto ahorra, cuantas veces al dia corre. Nunca en abstracto.',
   'aporta', 30,
   array['un flujo concreto y que hace', 'el antes y el despues de una tarea', 'el numero de veces que corre al mes']),

  ('Como funciona por dentro',
   'Abrir el capo. Nodos, decisiones tecnicas, por que se eligio una cosa y no otra. Ensenar el oficio, no esconderlo.',
   'aporta', 25,
   array['por que una cola de aprobacion es una tabla y no una espera', 'que se rompe cuando un modelo devuelve vacio']),

  ('Lo que salio mal',
   'Errores propios, cosas que no funcionaron, limites que nos comimos. Es el pilar que mas confianza da y el que casi nadie publica.',
   'conversa', 20,
   array['prohibirle algo a un modelo y que lo haga igual', 'un flujo que fallaba en silencio y no avisaba']),

  ('El negocio por dentro',
   'Construir en publico: como se pone precio, que se decide y por que, en que punto esta la agencia.',
   'conversa', 15,
   array['por que el precio sigue al entregable y no al cliente', 'que se aprende del primer cliente de pago']),

  ('Que hacemos y cuanto cuesta',
   'La oferta, con su limite escrito al lado. Poco y claro.',
   'vende', 10,
   array['una pieza del catalogo con su limite real'])
) as p(nombre, descripcion, proposito, cuota, ejemplos)
where m.slug = 'marirrodriga';

-- ---------------------------------------------------------------------------
-- Canales
-- ---------------------------------------------------------------------------

delete from public.marca_canales
 where marca_id = (select id from public.marcas where slug = 'marirrodriga');

insert into public.marca_canales (marca_id, canal, papel, cadencia, formatos, como_reparte, activo, notas)
select m.id, c.canal, c.papel, c.cadencia, c.formatos, c.como_reparte, c.activo, c.notas
from public.marcas m, (values
  ('linkedin',
   'Autoridad y captacion. Es donde esta el cliente que decide.',
   'cada 2 dias',
   array['texto', 'texto con imagen', 'carrusel'],
   'Se sigue a PERSONAS, no a empresas. Lo que decide si se lee es la primera linea antes del "ver mas": tiene que funcionar sola. Los comentarios reparten mas que las reacciones, asi que conviene dejar algo abierto. Los enlaces fuera de la plataforma penalizan: van en el primer comentario.',
   true,
   'Publicar en perfil personal usa un permiso de autoservicio que se aprueba al instante; la pagina de empresa exige el programa de partners de LinkedIn, con aprobacion manual. Pendiente de que Ismael confirme la identidad.'),

  ('threads',
   'Conversacion de nicho con coste de produccion casi cero. El sitio para probar angulos antes de invertir en video.',
   'diaria',
   array['texto', 'texto con imagen'],
   'Formato corto y conversacional. Premia responder y encadenar, no publicar y marcharse. Tolera mucho mejor el tono de oficio que Instagram.',
   true,
   'La aplicacion de Meta ya esta creada con el caso de uso de la API de Threads. Para cuenta propia no hace falta revision.'),

  ('instagram',
   'Escaparate y prueba social. Es donde un cliente mira para ver si existimos de verdad.',
   'cada 2 dias',
   array['reel', 'carrusel', 'foto'],
   'Lo que reparte alcance es que alguien lo mande por privado a otra persona; despues, que lo guarde; despues, que comente. Los "me gusta" no mueven nada. En carrusel la primera diapositiva es casi todo el trabajo. Los reels se ven sin sonido: lo importante va escrito en pantalla.',
   false,
   'Comprobar antes que la cuenta es PROFESIONAL. Con una cuenta personal la API no publica.'),

  ('tiktok',
   'Alcance y diferenciacion con un personaje virtual, sin nadie del equipo en camara.',
   'pendiente',
   array['reel'],
   'Manda cuanta gente lo ve entero, asi que lo corto se termina y lo largo no. Los dos primeros segundos lo deciden todo. Lo que parece anuncio se salta.',
   false,
   'Fase 2. Faltan nombre, voz y estilo visual del personaje.')
) as c(canal, papel, cadencia, formatos, como_reparte, activo, notas)
where m.slug = 'marirrodriga';

-- ---------------------------------------------------------------------------
-- Conocimiento — lo que podemos sostener
-- ---------------------------------------------------------------------------

delete from public.marca_conocimiento
 where marca_id = (select id from public.marcas where slug = 'marirrodriga');

insert into public.marca_conocimiento (marca_id, afirmacion, tipo, respaldo, fuente)
select m.id, k.afirmacion, k.tipo, k.respaldo, k.fuente
from public.marcas m, (values
  ('El motor de automatizacion es n8n autoalojado en servidor propio, no una cuenta de un tercero.',
   'hecho', 'Servidor en Francia, con Docker Swarm y Traefik.', '01-agency-profile.md'),
  ('La web de la agencia la construyeron dos personas en menos de catorce dias.',
   'hecho', 'Recogido en el perfil de agencia.', '01-agency-profile.md'),
  ('Primer cliente de pago cerrado el 19 de agosto de 2026.',
   'hecho', 'Contrato firmado y primer 50 % cobrado.', 'ceo-status.md'),
  ('Para publicar en cuentas propias de Meta no hace falta ni revision de la aplicacion ni verificacion del negocio.',
   'hecho', 'Comprobado el 26-08-2026 montando la aplicacion. La revision solo hace falta para cuentas de terceros.', 'rrss-agency.md'),
  ('El identificador del portafolio de empresa de Meta de la agencia es 1044411518487662.',
   'dato', 'Creado el 26-08-2026. Es el que se le da a un cliente para que nos anada como socio.', 'rrss-agency.md'),
  ('El correo del dominio pasa las tres comprobaciones de autenticidad desde fuera.',
   'hecho', 'SPF, DKIM y DMARC en PASS en un envio de prueba real. DMARC en cuarentena.', 'rrss-agency.md'),
  ('La IA no se compra, se implanta por fases.',
   'postura', 'Tesis de posicionamiento de la agencia, definida el 14-08-2026.', 'ceo-status.md'),
  ('El precio depende de cuanto hay que construir, no del tamano del cliente.',
   'postura', 'Regla de precio de la casa, comprobada con numeros el 14-08-2026.', 'ceo-status.md')
) as k(afirmacion, tipo, respaldo, fuente)
where m.slug = 'marirrodriga';

-- ---------------------------------------------------------------------------
-- Efemerides
-- ---------------------------------------------------------------------------

delete from public.marca_efemerides
 where marca_id = (select id from public.marcas where slug = 'marirrodriga');

insert into public.marca_efemerides (marca_id, nombre, recurrente, mes, dia, relevancia, notas)
select m.id, e.nombre, true, e.mes, e.dia, e.relevancia, e.notas
from public.marcas m, (values
  ('Presentacion trimestral de impuestos', 1, 20, 'alta', 'Enero, abril, julio y octubre: las tres semanas antes son cuando una asesoria o gestoria mas siente el dolor de lo manual.'),
  ('Presentacion trimestral de impuestos', 4, 20, 'alta', 'Ver la de enero.'),
  ('Presentacion trimestral de impuestos', 7, 20, 'alta', 'Ver la de enero.'),
  ('Presentacion trimestral de impuestos', 10, 20, 'alta', 'Ver la de enero.'),
  ('Vuelta de vacaciones', 9, null, 'alta', 'Septiembre es cuando un negocio local se replantea como trabaja. Mejor mes del ano para hablar de quitarse tareas.'),
  ('Propositos de ano nuevo', 1, null, 'media', 'Enero. Cuidado: es el mes con mas ruido motivacional, y ese tono esta vetado en esta marca.'),
  ('Black Friday', 11, null, 'baja', 'Relevante solo para clientes de comercio. La agencia no descuenta por fecha: el precio sigue al entregable.'),
  ('Cierre de ano', 12, null, 'media', 'Buen momento para el pilar del negocio por dentro: que se hizo, que se aprendio, con numeros.')
) as e(nombre, mes, dia, relevancia, notas)
where m.slug = 'marirrodriga';

commit;
