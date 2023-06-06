import { DotnetDistroSupportStatus } from './DotnetGlobalSDKLinuxInstallerResolver';
import { IDotnetInstallationContext } from './IDotnetInstallationContext';
/**
 * This interface describes the functionality needed to manage the .NET SDK on a specific distro and version of Linux.
 *
 * @remarks We accept community contributions of this interface for each distro-version pair.
 * All calls which require sudo must leverage the vscode/sudo library. We will not accept contributions that use other methods to gain admin privellege.
 * Please see DotnetDistroVersion as well to add your version.
 */
export declare abstract class IDistroDotnetSDKProvider {
    constructor();
    /**
     * Run the needed command(s) to install the .NET SDK on the machine 'globally.'
     * @param installContext
     */
    abstract installDotnet(installContext: IDotnetInstallationContext): Promise<boolean>;
    /**
     * Search the machine for all installed .NET SDKs and return a list of their fully specified versions.
     * The fully specified version is a 3-part semver, such as 7.0.103
     */
    abstract getInstalledDotnetVersions(): Promise<Array<string>>;
    /**
     * For the .NET SDK that should be on the path and or managed by the distro, return its path.
     * Return null if no installations can be found.
     */
    abstract getInstalledGlobalDotnetPathIfExists(): Promise<string | null>;
    /**
     * For the .NET SDK that should be on the path and or managed by the distro, return its fully specified version.
     * Return null if no installations can be found.
     */
    abstract getInstalledGlobalDotnetVersionIfExists(): Promise<string | null>;
    /**
     * Return the directory where the dotnet SDK should be installed per the distro preferences.
     * (e.g. where the distro would install it given its supported by default if you ran apt-get install.)
     */
    abstract getExpectedDotnetInstallationDirectory(): Promise<string>;
    /**
     * Return true if theres a package for the dotnet version on the system with the same major as the requested fullySpecifiedVersion, false elsewise.
     */
    abstract dotnetPackageExistsOnSystem(fullySpecifiedVersion: string): Promise<boolean>;
    /**
     * Return the support status for this distro and version. See DotnetDistroSupportStatus for more info.
     */
    abstract getDotnetVersionSupportStatus(fullySpecifiedVersion: string): Promise<DotnetDistroSupportStatus>;
    /**
     *
     * @param fullySpecifiedVersion The version of dotnet to check support for in the 3-part semver version.
     * @returns true if the version is supported by default within the distro, false elsewise.
     */
    isDotnetVersionSupported(fullySpecifiedVersion: string): Promise<boolean>;
    /**
     * Update the globally installed .NET to the newest in-support version of the same feature band and major.minor.
     * @param versionToUpgrade The version of dotnet to upgrade.
     */
    abstract upgradeDotnet(versionToUpgrade: string): Promise<boolean>;
    /**
     * Uninstall the .NET SDK.
     * @param versionToUninstall The fully specified version of the .NET SDK to uninstall.
     */
    abstract uninstallDotnet(versionToUninstall: string): Promise<boolean>;
}
