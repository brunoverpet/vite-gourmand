import emitter from '@adonisjs/core/services/emitter'
import { events } from '#generated/events'

emitter.on(events.OrderAccepted, [() => import('#listeners/sync_order_to_mongo'), 'handle'])
