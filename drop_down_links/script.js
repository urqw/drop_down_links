/**
 * Copyright (C) 2017 Akela <akela88@bk.ru>
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

Parser.prototype.openLinks = function(line) {
    while (line.search(/\[\[.+?\]\]/) != -1) {
        line = line.replace(/\[\[.+?\]\]/, function(exp) {
            var text;
            var command;
            exp = exp.substr(2, (exp.length - 4));

            if (exp.indexOf('|') > 0) {
                var exptmp = exp.split('|');
                command = exptmp[1].trim();
                text = exptmp[0].trim();

                if ((exp.match(/\|/g) || []).length > 1) {
                    var command2 =  exptmp[2].split(',');

                    var links = [];
                    var action = '';
                    for (var i = 0; i < command2.length; i++) {
                        if (Game.getLabel(command + '_' + command2[i].trim())) {
                            action = 'goto ' + command + '_' + command2[i].trim();
                        } else {
                            action = '';
                            // метка не найдена, такого действи€ нет. ћожно тут что нибудь выполнить, например
                            // action = 'pln ¬ы не можете ' +  command2[i].trim() + ' ' + command + '!';
                        }

                        var actionNum = GlobalPlayer.link(action);
                        links.push('<li><a href="#" class="button" data-action="' + actionNum + '">' + command2[i].trim() + '</a></li>');
                    }

                    return '<span class="dropdown dropdownmenulinks">' +
                        '<a href="#" class="dropdown dropdown-toggle" type="button" id="dropdownMenu' + actionNum +'" data-toggle="dropdown">' +
                        text +
                        '</a>' +
                        '<ul class="dropdown-menu">' +
                        links.join('') +
                        '</ul>' +
                        '</span>';
                }
            } else {
                command = exp.trim();
                text = exp;
            }

            return GlobalPlayer.Client.convertToLink(text, GlobalPlayer.link(command));
        });
    }

    return line;
};