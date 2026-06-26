import emitter from '@adonisjs/core/services/emitter'
import { events } from '#generated/events'
import SyncOrderToMongo from '#listeners/sync_order_to_mongo'

emitter.on(events.OrderAccepted, [SyncOrderToMongo, 'handle'])