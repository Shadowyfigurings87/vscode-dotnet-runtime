 /* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
 import * as eol from 'eol';
 import * as fs from 'fs';
 import * as path from 'path';
 import * as os from 'os';
 import * as proc from 'child_process';

export class FileUtilities {
    constructor() {}

    public static writeFileOntoDisk(scriptContent: string, filePath: string)
    {
        if (!fs.existsSync(path.dirname(filePath))) {
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
        }
        scriptContent = eol.auto(scriptContent);
        fs.writeFileSync(filePath, scriptContent);
        fs.chmodSync(filePath, 0o700);
    }

    /**
     * @param directoryToWipe the directory to delete all of the files in if privellege to do so exists.
     */
    public static wipeDirectory(directoryToWipe : string)
    {
        fs.readdir(directoryToWipe, (err, files) => {
            if (err) throw err;

            for (const file of files) {
            fs.unlink(path.join(directoryToWipe, file), (err) => {
                if (err) throw err;
            });
            }
        });
    }

    /**
     *
     * @returns true if the process is running with admin privelleges on windows.
     */
    public static isElevated() : boolean
    {
        if(os.platform() !== 'win32')
        {
            // TODO: Make sure this works on mac and linux.
            const commandResult = proc.spawnSync("id", ["-u"]);
            return commandResult.status === 0;
        }

        try
        {
            // If we can execute this command on Windows then we have admin rights.
            proc.execFileSync( "net", ["session"], { "stdio": "ignore" } );
            return true;
        }
        catch ( error )
        {
            return false;
        }
    }
}

