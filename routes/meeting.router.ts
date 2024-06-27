import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();
const {
  getMeetings,
  getMeetingById,
  createMeeting,
  updateMeeting,
  deleteMeeting,
} = require('../controllers/meeting.controller');

/**
 * @swagger
 * tags:
 *   name: Meetings
 *   description: Meetings management
 */

/**
 * @swagger
 * /api/meetings:
 *   get:
 *     summary: Retrieve all meetings
 *     tags: [Meetings]
 *     responses:
 *       200:
 *         description: A list of meetings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   date:
 *                     type: string
 *                   location:
 *                     type: string
 *                   description:
 *                     type: string
 *                   attendees:
 *                     type: array
 *                     items:
 *                       type: string
 *     security:
 *       - bearerAuth: []
 */
router.get('/', getMeetings);

/**
 * @swagger
 * /api/meetings/{id}:
 *   get:
 *     summary: Retrieve a single meeting by ID
 *     tags: [Meetings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the meeting to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Meeting found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 date:
 *                   type: string
 *                 location:
 *                   type: string
 *                 description:
 *                   type: string
 *                 attendees:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Meeting not found
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', getMeetingById);

/**
 * @swagger
 * /api/meetings:
 *   post:
 *     summary: Create a new meeting
 *     tags: [Meetings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - date
 *               - location
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               location:
 *                 type: string
 *               description:
 *                 type: string
 *               attendees:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Meeting created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 date:
 *                   type: string
 *                 location:
 *                   type: string
 *                 description:
 *                   type: string
 *                 attendees:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Bad request
 *     security:
 *       - bearerAuth: []
 */
router.post('/', createMeeting);

/**
 * @swagger
 * /api/meetings/{id}:
 *   put:
 *     summary: Update an existing meeting
 *     tags: [Meetings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the meeting to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               location:
 *                 type: string
 *               description:
 *                 type: string
 *               attendees:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Meeting updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 date:
 *                   type: string
 *                 location:
 *                   type: string
 *                 description:
 *                   type: string
 *                 attendees:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Bad request
 *       404:
 *         description: Meeting not found
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', updateMeeting);

/**
 * @swagger
 * /api/meetings/{id}:
 *   delete:
 *     summary: Delete a meeting
 *     tags: [Meetings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the meeting to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Meeting deleted
 *       404:
 *         description: Meeting not found
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', deleteMeeting);

module.exports = router;