
const express = require('express');
const pullRequestBL = require('../models/pullRequestBL');
const router = express.Router();




router.route('/getPullRequest')
    .get(async function (req, resp) {
        let pullRequestList = await pullRequestBL.getPullRequestFromGitHub()
        await pullRequestBL.updataDateFromApi(pullRequestList)
        let pullRequestFromDB = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(pullRequestBL.getDataPullRequests())
            }, 1000);
        });
        return resp.json(await pullRequestFromDB)
    })



module.exports = router;