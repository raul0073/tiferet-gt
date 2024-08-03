import { z } from 'zod';
import { FastifyReply, FastifyInstance } from 'fastify';

export function handleError(error: any, reply: FastifyReply, logger?: FastifyInstance['log']) {
  if (error instanceof z.ZodError) {
    // Handle validation errors
    return reply.status(400).send({
      error: 'Validation error',
      details: error.errors.map(e => ({ path: e.path, message: e.message }))
    });
  } else if (error.name === 'MongoError') {
    // Handle MongoDB errors
    return reply.status(500).send({
      error: 'Database error',
      message: error.message
    });
  } else {
    // Handle general errors
    if (logger) {
      logger.error('Unexpected error:', error);
    }
    return reply.status(500).send({
      error: 'Internal Server Error',
      message: error.message
    });
  }
}