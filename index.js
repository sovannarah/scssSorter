const fs = require('fs')

const sortCss = (path) => {
    fs.readdir(path, (err, contentDir) => {
        if(contentDir && contentDir.length > 0) {
            contentDir.forEach(async (content, index) => {
                if (content.match(/.scss/g)) {
                    const contentFile = fs.readFileSync(path + content, 'utf8');
                    let portion = []
                    let arr = contentFile.split('\n');
                    arr.forEach((line, index) => {
                        if (!line.match(/;/g)) {
                            if (portion.length > 1) {
                                const sortPortion = portion.sort();
                                sortPortion.forEach((item, i) => {
                                    arr[(index - sortPortion.length) + i] = item;
                                })
                            }
                            portion = [];
                        } else {
                            portion.push(line);
                        }
                    })
                    fs.writeFile(path + content, arr.join('\n'), function (err) {
                        if (err) throw err;
                        console.log('Saved!');
                    });
                } else if (content.match(/./g)) {
                    sortCss(path + content + '/');
                }
            })
        }
    })
}