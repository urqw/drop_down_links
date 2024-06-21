/**
 * Copyright (C) 2017 Akela <akela88@bk.ru>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, see <http://www.gnu.org/licenses/>.
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