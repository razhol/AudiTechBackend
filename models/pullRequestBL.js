let pullRequest = require('./pullRequestModle')


var axios = require("axios")


exports.saveDataInDb = function (obj) {
    return new Promise((resolve, reject) => {
        let PullRequest = new pullRequest({
            id: obj.id,
            title: obj.title,
            body: obj.body,
            created_at: obj.created_at,
            url: obj.url
        });

        PullRequest.save(function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve(obj)
            }
        })
    });
}



exports.updataDateFromApi = async function (ApiData) {
    let DbData = await this.getDataPullRequests()
    if (DbData.length == 0) {
        await ApiData.forEach(element => {
            this.saveDataInDb(element)
        });
    }
    else {

        let filterdData = ApiData.filter(x => DbData.filter(y => y.id == x.id).length == 0)
        if (filterdData.length > 0) {
            await filterdData.forEach(x => this.saveDataInDb(x))
        }
    }
}


exports.getDataPullRequests = function () {
    return new Promise((resolve, reject) =>
        pullRequest.find({}, function (err, data) {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        }))
}




exports.getPullRequestFromGitHub = async function () {
    let data = await axios({
        method: "get",
        url: `https://api.github.com/repos/razhol/demo_repository/pulls?state=all`,
        headers: {
            Authorization: `Bearer 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`,
            "Content-Type": "application/json"
        }
    }).then(response => {
        return response.data;
    }).catch(err => {
        return err;
    });

    return data
}







