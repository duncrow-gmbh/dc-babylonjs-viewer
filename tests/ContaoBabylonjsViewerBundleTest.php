<?php

declare(strict_types=1);

/*
 * This file is part of [package name].
 *
 * (c) John Doe
 *
 * @license LGPL-3.0-or-later
 */

namespace DuncrowGmbh\ContaoBabylonjsViewerBundle\Tests;

use DuncrowGmbh\ContaoBabylonjsViewerBundle\ContaoBabylonjsViewerBundle;
use PHPUnit\Framework\TestCase;

class ContaoBabylonjsViewerBundleTest extends TestCase
{
    public function testCanBeInstantiated(): void
    {
        $bundle = new ContaoBabylonjsViewerBundle();

        $this->assertInstanceOf('DuncrowGmbh\ContaoBabylonjsViewerBundle\ContaoBabylonjsViewerBundle', $bundle);
    }
}
